import {useState} from "react";
import {autoPlacement,useFloating,useHover,useInteractions} from "@floating-ui/react";

import testbat from "assets/test-bat.webp";

import "./item-row.less";

interface ItemRowProps
{

}

export function ItemRow(props:ItemRowProps):JSX.Element
{
  const [isOpen,setIsOpen]=useState(false);
  const {refs,floatingStyles,context}=useFloating({
    open:isOpen,
    onOpenChange:setIsOpen,
    middleware:[autoPlacement({
      allowedPlacements:["top","bottom"]
    })]
  });
  const hover=useHover(context);
  const {getReferenceProps,getFloatingProps}=useInteractions([hover]);

  return <>
    <div className="item-row">
      <div className="img">
        <div className="item-contain" ref={refs.setReference} {...getReferenceProps}>
          <img src={testbat}/>
        </div>
      </div>
      <div className="detail">
        <div className="main-details">
          <h1>Ghost Hand</h1>
          <div className="sub-details">
            <div className="detail-item">
              <p className="first">Builds</p>
              <p>10</p>
            </div>
            <div className="detail-item">
              <p className="first">Likes</p>
              <p>10</p>
            </div>
          </div>
        </div>
        <div className="sort-stat">
          <h2>Builds</h2>
          <p>40</p>
        </div>
      </div>
    </div>

    {isOpen && (
      <div className="floating" ref={refs.setFloating} style={floatingStyles} {...getFloatingProps}>
        huh
      </div>
    )}
  </>;
}