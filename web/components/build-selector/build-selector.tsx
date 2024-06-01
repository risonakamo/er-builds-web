import {useMemo, useRef, useState} from "react";
import _ from "lodash";
import {useAtom} from "jotai";

import {Dropdown1, DropdownItem} from "components/dropdown1/dropdown1";
import {Button1} from "components/button1/button1";
import {resolveCharacterImg} from "lib/dak-lib";
import {itemStatSortOptionsAsDropdownItems} from "lib/er-data-lib";
import {convertCharacterNameToDisplayName, convertWeaponNameToDisplayName} from "lib/display-names";
import {lastItemSortAtm, selectedCharacterAtm, selectedWeaponAtm} from "@/pages/index-page/index-atoms";
import {openConfigFile, runDownloader, runNicaDownloader} from "apis/er-builds-api";

import "./build-selector.less";

interface BuildSelectorProps
{
  datafiles:ErDataFileDescriptor[]

  onItemSortChange(newSortState:ItemStatsSortField):void
  onCharacterChange(newChar:string):void
}

/** build selector header for builds page */
export function BuildSelector(props:BuildSelectorProps):JSX.Element
{
  // --- states
  const [selectedCharacter]=useAtom<string|null>(selectedCharacterAtm);
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
    .uniqBy((item:DropdownItem):string=>{
      return item.value;
    })
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
    .uniqBy((item:DropdownItem):string=>{
      return item.value;
    })
    .value();
  },[selectedCharacter,props.datafiles]);



  // --- handlers
  const openConfigFileThrottled=useRef(_.throttle(openConfigFile,1500));
  const runDownloadThrottled=useRef(_.throttle(runDownloader,4500));
  const runNicaDownloadThrottled=useRef(_.throttle(runNicaDownloader,4500));

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

  /** clicked on button to open config file. use api func to open config file */
  function h_clickedOpenConfig():void
  {
    openConfigFileThrottled.current();
  }

  /** clicked button to run downloader. use api func to run the downloader */
  function h_clickedRunDownloader():void
  {
    runDownloadThrottled.current();
  }

  /** clicked button to run nica downloader. use api func to run the downloader */
  function h_clickedNicaDownloader():void
  {
    runNicaDownloadThrottled.current();
  }



  // --- render
  const weaponDropdownDisabled:boolean=!weaponOptions.length;

  return <div className="build-selector">
    <div className="contain">
      <div className="select-row">
        <span className="row-title">Character</span>
        <span>
          <Dropdown1 options={characterOptions} currentSelection={selectedCharacter}
            placeholder="Character" onSelectionChange={props.onCharacterChange}/>
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

      <div className="select-row">
        <Button1 text="Open Downloader Config" onClick={h_clickedOpenConfig}/>
        <Button1 text="Run Downloader" onClick={h_clickedRunDownloader}/>
        <Button1 text="Run Nica Downloader" onClick={h_clickedNicaDownloader}/>
      </div>
    </div>
  </div>;
}