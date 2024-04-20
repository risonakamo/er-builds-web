import {FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions} from "@floating-ui/react";
import "./dropdown1.less";
import {useState} from "react";

interface Dropdown1Props
{

}

export function Dropdown1(props:Dropdown1Props):JSX.Element
{
  const [open,setOpen]=useState<boolean>(false);

  const {refs,floatingStyles,context}=useFloating({
    open,
    onOpenChange:setOpen,
    placement:"bottom-start"
  });

  const floatClick=useClick(context);
  const floatDismiss=useDismiss(context);
  const {getReferenceProps,getFloatingProps}=useInteractions([floatClick,floatDismiss]);

  return <>
    <div className="dropdown1" ref={refs.setReference} {...getReferenceProps()}>
      huh
    </div>

    {open &&
      <FloatingPortal>
        <div className="dropdown1-float-box" ref={refs.setFloating} style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className="select-item">
            hello
          </div>
          <div className="select-item">
            hello2
          </div>
        </div>
      </FloatingPortal>
    }
  </>;
}