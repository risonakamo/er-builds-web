import {useMemo} from "react";
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
  // convert datafiles to select options
  const characterOptions=useMemo(():DropdownItem[]=>{
    return _.map(props.datafiles,(datafile:ErDataFileDescriptor):DropdownItem=>{
      return {
        value:datafile.character,
        img:resolveCharacterImg(datafile.character),
      }
    });
  },[props.datafiles]);

  return <div className="build-selector">
    <div className="contain">
      <div className="select-row">
        <span className="row-title">Character</span>
        <span>
          <Dropdown1 options={characterOptions} currentSelection={null} placeholder="Character"/>
        </span>
      </div>

      <div className="select-row">
        <span className="row-title">Weapon</span>
        <span>
          <Dropdown1 options={[]} currentSelection={null} placeholder="Weapon"/>
        </span>
      </div>
    </div>
  </div>;
}