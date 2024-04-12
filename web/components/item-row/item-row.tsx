import {useState} from "react";
import {autoPlacement,useFloating,useHover,useInteractions} from "@floating-ui/react";

import testbat from "assets/test-bat.webp";

import "./item-row.less";

interface ItemRowProps
{
  itemStats: ItemsStatistics
}

/** displays statistics information about a certain item */
export function ItemRow(props:ItemRowProps):JSX.Element
{
  // --- floatui stuff ---
  // todo: move this into dedicated element for just displaying any item's
  // image along with its stats in a floating popup
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
          <h1>{props.itemStats.itemInfo.name}</h1>
          <div className="sub-details">
            <div className="detail-item">
              <p className="first">Builds</p>
              <p>{props.itemStats.totalBuilds}</p>
            </div>
            <div className="detail-item">
              <p className="first">Likes</p>
              <p>{props.itemStats.likes}</p>
            </div>
          </div>
        </div>
        <div className="sort-stat">
          <h2>Builds</h2>
          <p>{props.itemStats.totalBuilds}</p>
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