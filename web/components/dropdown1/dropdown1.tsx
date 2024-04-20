import {useState} from "react";
import {FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating,
  useInteractions} from "@floating-ui/react";

import "./dropdown1.less";

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
      <div className="select-item-contain">
        <img src="https://cdn.dak.gg/assets/er/game-assets/1.19.0/CharCommunity_DebiMarlene_S000.png"/>
        <span>DebiMarlene</span>
      </div>
    </div>

    {open &&
      <FloatingPortal>
        <div className="dropdown1-float-box" ref={refs.setFloating} style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className="select-item">
            <div className="select-item-contain">
              <img src="https://cdn.dak.gg/assets/er/game-assets/1.19.0/CharCommunity_DebiMarlene_S000.png"/>
              <span>DebiMarlene</span>
            </div>
          </div>

          <div className="select-item">
            <div className="select-item-contain">
              <img src="https://cdn.dak.gg/assets/er/game-assets/1.19.0/CharCommunity_Tia_S000.png"/>
              <span>Tia</span>
            </div>
          </div>
        </div>
      </FloatingPortal>
    }
  </>;
}