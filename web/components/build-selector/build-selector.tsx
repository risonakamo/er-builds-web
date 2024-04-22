import {useMemo, useState} from "react";
import _ from "lodash";

import {Dropdown1, DropdownItem} from "components/dropdown1/dropdown1";

import {resolveCharacterImg} from "lib/dak-lib";

import "./build-selector.less";

interface BuildSelectorProps
{
  datafiles:ErDataFileDescriptor[]
}

/** build selector header for builds page */
export function BuildSelector(props:BuildSelectorProps):JSX.Element
{
  // --- states
  const [selectedCharacter,setSelectedCharacter]=useState<string|null>(null);
  const [selectedWeapon,setSelectedWeapon]=useState<string|null>(null);




  // --- derived states
  // convert datafiles to select options
  const characterOptions:DropdownItem[]=useMemo(()=>{
    return _(props.datafiles)
    .map((datafile:ErDataFileDescriptor):DropdownItem=>{
      return {
        value:datafile.character,
        img:resolveCharacterImg(datafile.character),
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
      };
    })
    .uniq()
    .value();
  },[selectedCharacter,props.datafiles]);



  // --- handlers
  /** selected character with character select dropdown. set the selected character and clear
   *  the weapon selection. */
  function h_selectedCharacter(newCharacter:string):void
  {
    setSelectedCharacter(newCharacter);
    setSelectedWeapon(null);
  }

  /** selected new weapon with weapon select dropdown. set the new weapon */
  function h_selectedWeapon(newWeapon:string):void
  {
    setSelectedWeapon(newWeapon);
  }



  // --- render
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
            onSelectionChange={h_selectedWeapon}/>
        </span>
      </div>
    </div>
  </div>;
}