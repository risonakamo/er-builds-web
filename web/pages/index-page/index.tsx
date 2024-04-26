import {createRoot} from "react-dom/client";
import {useQuery,QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {atom,useAtomValue} from "jotai";
import {useState} from "react";
import {useImmer} from "use-immer";
import _ from "lodash";

import {ItemList} from "components/item-list/item-list";
import {BuildSelector} from "components/build-selector/build-selector";
import {getBuilds,getDatafiles} from "apis/er-builds-api";
import {ItemTypes_all} from "lib/item-type-lib";
import {ItemTypeToIcon,ItemTypeToTooltip} from "lib/item-type-lib";

import "./index.less";

// --- atoms
export const selectedCharacterAtm=atom<string|null>(null);
export const selectedWeaponAtm=atom<string|null>(null);
export const lastItemSortAtm=atom<ItemStatsSortField|null>(null);

function IndexPage():JSX.Element
{
  // --- atoms
  const selectedCharacter=useAtomValue<string|null>(selectedCharacterAtm);
  const selectedWeapon=useAtomValue<string|null>(selectedWeaponAtm);




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




  // --- queries
  const buildsDataQy=useQuery<GroupedItemStatistics>({
    queryKey:[selectedCharacter,selectedWeapon],
    enabled:!!(
      selectedCharacter
      && selectedWeapon
    ),

    initialData:{
      weapon:[],
      head:[],
      chest:[],
      arm:[],
      leg:[],
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



  // --- inline components
  /** renders placeholder for when there are no character/weapon selected */
  function EmptyItemLists():JSX.Element
  {
    return <div className="no-data">
      <h2>no character/weapon selected</h2>
    </div>;
  }

  /** renders the 5 main item lists */
  function ItemLists():JSX.Element[]
  {
    // create item list for all of the available item types
    return _.map(ItemTypes_all,(itemType:ItemType):JSX.Element=>{
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
      <BuildSelector datafiles={datafilesQy.data} onItemSortChange={h_sharedItemSortDropdownChange}/>
    </div>
    <div className="item-lists">
      {!characterWeaponSelected && <EmptyItemLists/>}
      {characterWeaponSelected && <ItemLists/>}
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