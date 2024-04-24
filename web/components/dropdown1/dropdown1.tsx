import {useMemo, useState} from "react";
import {FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating,
  useInteractions} from "@floating-ui/react";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import _ from "lodash";
import {clsx} from "clsx";

import "./dropdown1.less";

interface Dropdown1Props<T extends string = string>
{
  options:DropdownItem<T>[]
  currentSelection:string|null

  onSelectionChange?(newSelection:T):void

  placeholder:string
  disabled?:boolean
}

export interface DropdownItem<T extends string = string>
{
  value:T

  img?:string
  displayText?:string
}

export function Dropdown1<T extends string>(props:Dropdown1Props<T>):JSX.Element
{
  // --- states ---
  const [open,setOpen]=useState<boolean>(false);


  // --- derived ---
  const currentSelectionObj:DropdownItem<T>|undefined=useMemo(()=>{
    return _.find(props.options,(option:DropdownItem<T>):boolean=>{
      return option.value==props.currentSelection;
    });
  },[props.currentSelection]);


  // --- float ui ---
  const {refs,floatingStyles,context,elements}=useFloating<HTMLDivElement>({
    open,
    onOpenChange:setOpen,
    placement:"bottom-start",
  });

  const floatClick=useClick(context);
  const floatDismiss=useDismiss(context);
  const {getReferenceProps,getFloatingProps}=useInteractions([floatClick,floatDismiss]);




  // --- render funcs ---
  /** render all select option items */
  function r_selectItems():JSX.Element[]
  {
    return _.map(props.options,(selectItem:DropdownItem<T>):JSX.Element=>{
      /** clicked on select item. set the current selection to the item. close the dropdown */
      function h_selectItemClick():void
      {
        props.onSelectionChange?.(selectItem.value);
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
        <span>{props.placeholder}</span>
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


  // --- prerender ---
  const floatboxStyle:React.CSSProperties={
    ...floatingStyles,
    minWidth:`${elements.reference?.getBoundingClientRect().width}px` || "100px"
  }

  const topCx:string=clsx("dropdown1",{
    disabled:props.disabled
  });




  // --- render ---
  return <>
    <div className={topCx} ref={refs.setReference} {...getReferenceProps()}>
      <div className="select-item-contain">
        {r_currentSelection()}
      </div>
    </div>

    {open &&
      <FloatingPortal>
        <div className="dropdown1-float-box" ref={refs.setFloating} style={floatboxStyle}
          {...getFloatingProps()}
        >
          {r_selectItems()}
        </div>
      </FloatingPortal>
    }
  </>;
}

interface SelectItemContainProps<T extends string>
{
  option:DropdownItem<T>
}

/** container for a dropdown item */
function SelectItemContain<T extends string>(props:SelectItemContainProps<T>):JSX.Element
{
  return <div className="select-item-contain">
    {props.option.img &&
      <img src={props.option.img}/>
    }
    <span>{props.option.displayText || props.option.value}</span>
  </div>;
}