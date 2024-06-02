import {createRoot} from "react-dom/client";
import {useQuery,QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {atom,useAtom} from "jotai";
import {useEffect, useRef, useState} from "react";
import {useImmer} from "use-immer";
import _ from "lodash";

import {ItemList} from "components/item-list/item-list";
import {BuildSelector} from "components/build-selector/build-selector";
import {getBuilds,getDatafiles} from "apis/er-builds-api";
import {ItemTypes_all} from "lib/item-type-lib";
import {ItemTypeToIcon,ItemTypeToTooltip} from "lib/item-type-lib";
import {getSelectedCharacterUrlArgs, setSelectedCharacterUrlArgs} from "lib/url-query";
import {selectedCharacterAtm, selectedWeaponAtm} from "./index-atoms";
import {filterToDatafilesOfCharacter} from "lib/er-data-lib";

import "./index.less";

function IndexPage():JSX.Element
{
  // --- atoms
  const [selectedCharacter,setSelectedCharacter]=useAtom<string|null>(selectedCharacterAtm);
  const [selectedWeapon,setSelectedWeapon]=useAtom<string|null>(selectedWeaponAtm);




  // --- states
  // dict that holds the state for each of the item sort dropdowns. each item list is associated
  // with one of the ItemTypes, so that is the val of this dict.
  const [
    itemSortDropdownsStates,
    setItemSortDropdownsStates,
  ]=useImmer<Record<ItemType,ItemStatsSortField>>(
    _.fromPairs(
      _.map(ItemTypes_all,(itemType:ItemType):[ItemType,ItemStatsSortField]=>{
        return [itemType,"builds"];
      }),
    ) as Record<ItemType,ItemStatsSortField>,
  );

  const [didUrlArgsLoad,setDidUrlArgsLoad]=useState<boolean>(false);




  // --- queries
  /** the builds data for the current character/weapon. only loaded when character/weapon have
   *  been selected */
  const buildsDataQy=useQuery<GroupedItemStatistics>({
    queryKey:[selectedCharacter,selectedWeapon],
    enabled:!!(
      selectedCharacter
      && selectedWeapon
    ),

    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false,

    initialData:{
      weapon:[],
      head:[],
      chest:[],
      arm:[],
      leg:[],
      tacskill:[],
      augment:[],
      late:[],
    },

    async queryFn():Promise<GroupedItemStatistics>
    {
      if (!selectedCharacter || !selectedWeapon)
      {
        throw "missing selections";
      }

      const data=await getBuilds(selectedCharacter,selectedWeapon);
      console.log(data);
      return data;
    }
  });

  const datafilesQy=useQuery<ErDataFileDescriptor[]>({
    queryKey:["datafiles"],
    initialData:[],

    async queryFn():Promise<ErDataFileDescriptor[]>
    {
      const data=await getDatafiles();
      console.log("datafiles",data);
      return data;
    }
  });



  // --- effects
  /** on selected character or selected weapon changing, update the url args. not enabled until did
   *  url args load completes. */
  useEffect(()=>{
    if (!didUrlArgsLoad)
    {
      return;
    }

    setSelectedCharacterUrlArgs({
      character:selectedCharacter || undefined,
      weapon:selectedWeapon || undefined,
    });
  },[selectedCharacter,selectedWeapon]);

  /** on page load, read the url args and set the character/weapon if they are set. do not set weapon
   *  if it is set without character */
  useEffect(()=>{
    const urlArgs:SelectedCharacterUrlArgs=getSelectedCharacterUrlArgs();

    if (urlArgs.character)
    {
      setSelectedCharacter(urlArgs.character);
    }

    if (urlArgs.character && urlArgs.weapon)
    {
      setSelectedWeapon(urlArgs.weapon);
    }

    setDidUrlArgsLoad(true);
  },[]);



  // --- state control
  /** change selected character with various side effects also, set the weapon
   *  to the character's first datafile's weapon, or null if there isn't one, but this should be
   *  impossible. */
  function changeCharacter(newChar:string):void
  {
    if (newChar==selectedCharacter)
    {
      return;
    }

    setSelectedCharacter(newChar);

    const characterDataFiles:ErDataFileDescriptor[]=filterToDatafilesOfCharacter(
      datafilesQy.data,
      newChar,
    );

    if (characterDataFiles.length)
    {
      setSelectedWeapon(characterDataFiles[0].weapon);
    }

    else
    {
      console.error("no datafiles for character");
      console.log(datafilesQy.data);
      setSelectedWeapon(null);
    }
  }



  // --- handlers
  /** on changing the main item sort, set all of the fields of the other item sorts */
  function h_sharedItemSortDropdownChange(newSort:ItemStatsSortField):void
  {
    setItemSortDropdownsStates((draft)=>{
      return _.mapValues(draft,():ItemStatsSortField=>{
        return newSort;
      });
    });
  }

  /** build selector triggered character dropdown change */
  function h_characterDropdownChange(newchar:string):void
  {
    changeCharacter(newchar);
  }



  // --- sub renders
  /** renders placeholder for when there are no character/weapon selected */
  function r_emptyItemLists():JSX.Element
  {
    if (characterWeaponSelected)
    {
      return <></>;
    }

    return <div className="no-data">
      <h2>no character/weapon selected</h2>
    </div>;
  }

  /** renders the item lists */
  function r_itemLists():JSX.Element[]
  {
    if (!characterWeaponSelected)
    {
      return [];
    }

    // create item list for all of the available item types
    return _.map(ItemTypes_all,(itemType:ItemType):JSX.Element=>{
      // if there is no data for the particular item list, don't render the item list
      if (!buildsDataQy.data[itemType] || !buildsDataQy.data[itemType].length)
      {
        return <></>;
      }

      /** sort field changed. access the dropdown states dict and set the value */
      function h_sortFieldChange(newSortField:ItemStatsSortField):void
      {
        setItemSortDropdownsStates((draft)=>{
          draft[itemType]=newSortField;
        });
      }

      return <ItemList itemStats={buildsDataQy.data[itemType]} key={itemType}
        sortField={itemSortDropdownsStates[itemType]} onSortFieldChange={h_sortFieldChange}
        listIcon={ItemTypeToIcon[itemType]} listIconTooltip={ItemTypeToTooltip[itemType]}/>;
    });
  }




  // --- render
  const characterWeaponSelected:boolean=!!(selectedCharacter && selectedWeapon);

  return <>
    <div className="top-header">
      <BuildSelector datafiles={datafilesQy.data} onItemSortChange={h_sharedItemSortDropdownChange}
        onCharacterChange={h_characterDropdownChange}/>
    </div>
    <div className="item-lists">
      {r_emptyItemLists()}
      {r_itemLists()}
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector("main")!).render(
    <QueryClientProvider client={new QueryClient()}>
      <IndexPage/>
    </QueryClientProvider>
  );
}

window.onload=main;