import {useMemo, useState} from "react";
import _ from "lodash";
import {useAtom} from "jotai";

import { selectedCharacterAtm,selectedWeaponAtm,lastItemSortAtm} from "web/pages/index-page";
import {Dropdown1, DropdownItem} from "components/dropdown1/dropdown1";
import {resolveCharacterImg} from "lib/dak-lib";
import {filterToDatafilesOfCharacter, itemStatSortOptionsAsDropdownItems} from "lib/er-data-lib";
import {convertCharacterNameToDisplayName, convertWeaponNameToDisplayName} from "lib/display-names";

import "./build-selector.less";

interface BuildSelectorProps
{
  datafiles:ErDataFileDescriptor[]

  onItemSortChange(newSortState:ItemStatsSortField):void
}

/** build selector header for builds page */
export function BuildSelector(props:BuildSelectorProps):JSX.Element
{
  // --- states
  const [selectedCharacter,setSelectedCharacter]=useAtom<string|null>(selectedCharacterAtm);
  const [selectedWeapon,setSelectedWeapon]=useAtom<string|null>(selectedWeaponAtm);
  const [lastItemSort,setLastItemSort]=useAtom<ItemStatsSortField|null>(lastItemSortAtm);




  // --- derived states
  // convert datafiles to select options
  const characterOptions:DropdownItem[]=useMemo(()=>{
    return _(props.datafiles)
    .map((datafile:ErDataFileDescriptor):DropdownItem=>{
      return {
        value:datafile.character,
        img:resolveCharacterImg(datafile.character),
        displayText:convertCharacterNameToDisplayName(datafile.character),
      };
    })
    .uniq()
    .value();
  },[props.datafiles]);

  // available weapon options, only if a character is selected
  const weaponOptions:DropdownItem[]=useMemo(()=>{
    if (!selectedCharacter)
    {
      return [];
    }

    return _(props.datafiles)
    .filter((datafile:ErDataFileDescriptor):boolean=>{
      return datafile.character==selectedCharacter;
    })
    .map((datafile:ErDataFileDescriptor):DropdownItem=>{
      return {
        value:datafile.weapon,
        displayText:convertWeaponNameToDisplayName(datafile.weapon),
      };
    })
    .uniq()
    .value();
  },[selectedCharacter,props.datafiles]);



  // --- handlers
  /** selected character with character select dropdown. set the selected character. also, set the weapon
   *  to the character's first datafile's weapon, or null if there isn't one, but this should be
   *  impossible. */
  function h_selectedCharacter(newCharacter:string):void
  {
    setSelectedCharacter(newCharacter);

    const characterDataFiles:ErDataFileDescriptor[]=filterToDatafilesOfCharacter(
      props.datafiles,
      newCharacter,
    );

    if (characterDataFiles.length)
    {
      setSelectedWeapon(characterDataFiles[0].weapon);
    }

    else
    {
      console.error("no datafiles for character");
      console.log(props.datafiles);
      setSelectedWeapon(null);
    }
  }

  /** selected new weapon with weapon select dropdown. set the new weapon */
  function h_selectedWeapon(newWeapon:string):void
  {
    setSelectedWeapon(newWeapon);
  }

  /** item sort dropdown changed. trigger the event, but also set the state directly */
  function h_selectedItemSort(newSort:ItemStatsSortField):void
  {
    props.onItemSortChange(newSort);
    setLastItemSort(newSort);
  }



  // --- render
  const weaponDropdownDisabled:boolean=!weaponOptions.length;

  return <div className="build-selector">
    <div className="contain">
      <div className="select-row">
        <span className="row-title">Character</span>
        <span>
          <Dropdown1 options={characterOptions} currentSelection={selectedCharacter}
            placeholder="Character" onSelectionChange={h_selectedCharacter}/>
        </span>
      </div>

      <div className="select-row">
        <span className="row-title">Weapon</span>
        <span>
          <Dropdown1 options={weaponOptions} currentSelection={selectedWeapon} placeholder="Weapon"
            onSelectionChange={h_selectedWeapon} disabled={weaponDropdownDisabled}/>
        </span>
      </div>

      <div className="select-row">
        <span className="row-title">Item Sort</span>
        <span>
          <Dropdown1<ItemStatsSortField> options={itemStatSortOptionsAsDropdownItems}
            currentSelection={lastItemSort} placeholder="Item Sort"
            onSelectionChange={h_selectedItemSort}/>
        </span>
      </div>
    </div>
  </div>;
}