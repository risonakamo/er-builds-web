import {useMemo, useState} from "react";
import {FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating,
  useInteractions} from "@floating-ui/react";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import _ from "lodash";

import "./dropdown1.less";

export interface DropdownItem
{
  value:string

  img?:string
  displayText?:string
}

interface Dropdown1Props
{
  options:DropdownItem[]
}

export function Dropdown1(props:Dropdown1Props):JSX.Element
{
  // --- states ---
  const [open,setOpen]=useState<boolean>(false);
  const [currentSelection,setCurrentSelection]=useState<string|null>(null);


  // --- derived ---
  const currentSelectionObj:DropdownItem|undefined=useMemo(()=>{
    return _.find(props.options,(option:DropdownItem):boolean=>{
      return option.value==currentSelection;
    });
  },[currentSelection]);


  // --- float ui ---
  const {refs,floatingStyles,context}=useFloating({
    open,
    onOpenChange:setOpen,
    placement:"bottom-start"
  });

  const floatClick=useClick(context);
  const floatDismiss=useDismiss(context);
  const {getReferenceProps,getFloatingProps}=useInteractions([floatClick,floatDismiss]);




  // --- render funcs ---
  /** render all select option items */
  function r_selectItems():JSX.Element[]
  {
    return _.map(props.options,(selectItem:DropdownItem):JSX.Element=>{
      /** clicked on select item. set the current selection to the item. close the dropdown */
      function h_selectItemClick():void
      {
        setCurrentSelection(selectItem.value);
        setOpen(false);
      }

      return <div className="select-item" key={selectItem.value} onClick={h_selectItemClick}>
        <div className="select-item-contain">
          {selectItem.img &&
            <img src={selectItem.img}/>
          }
          <span>{selectItem.displayText || selectItem.value}</span>
        </div>
      </div>;
    });
  }

  /** render the current selection */
  function r_currentSelection():JSX.Element
  {
    if (!currentSelectionObj)
    {
      return <>
        <span>Character</span>
        <ChevronDownIcon className="down-icon"/>
      </>;
    }

    return <>
      {currentSelectionObj.img &&
        <img src={currentSelectionObj.img}/>
      }
      <span>{currentSelectionObj.displayText || currentSelectionObj.value}</span>
      <ChevronDownIcon className="down-icon"/>
    </>;
  }



  // --- render ---
  return <>
    <div className="dropdown1" ref={refs.setReference} {...getReferenceProps()}>
      <div className="select-item-contain">
        {r_currentSelection()}
      </div>
    </div>

    {open &&
      <FloatingPortal>
        <div className="dropdown1-float-box" ref={refs.setFloating} style={floatingStyles}
          {...getFloatingProps()}
        >
          {r_selectItems()}
        </div>
      </FloatingPortal>
    }
  </>;
}

interface SelectItemContainProps
{
  option:DropdownItem
}

/** container for a dropdown item */
function SelectItemContain(props:SelectItemContainProps):JSX.Element
{
  return <div className="select-item-contain">
    {props.option.img &&
      <img src={props.option.img}/>
    }
    <span>{props.option.displayText || props.option.value}</span>
  </div>;
}