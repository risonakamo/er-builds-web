import {useState} from "react";
import {autoPlacement,useFloating,useHover,useInteractions} from "@floating-ui/react";
import _ from "lodash";

import {allItemStatSortFields, getSortableField} from "lib/er-data-lib";
import { resolveDakUrl } from "lib/dak-lib";

import "./item-row.less";

interface ItemRowProps
{
  itemStats: ItemsStatistics
  sortStat: ItemStatsSortField
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



  // --- render funcs
  /** render the primary sorted state section */
  function r_sortStat():JSX.Element
  {
    const targetSortField:ItemStatsSortableValue=getSortableField(props.itemStats,props.sortStat);

    return <>
      <h2>{targetSortField.fieldDisplayName}</h2>
      <p>{targetSortField.displayValue}</p>
    </>;
  }

  /** render all the sub details */
  function r_subDetails():JSX.Element[]
  {
    return _.map(allItemStatSortFields,(sortField:ItemStatsSortField):JSX.Element=>{
      const fieldValue:ItemStatsSortableValue=getSortableField(props.itemStats,sortField);

      // don't render the current sort stat as a sub detail
      if (sortField==props.sortStat)
      {
        return <></>;
      }

      return <div className="detail-item" key={sortField}>
        <p className="first">{fieldValue.fieldDisplayName}</p>
        <p>{fieldValue.displayValue}</p>
      </div>;
    });
  }



  // --- render
  const itemContainStyles:React.CSSProperties={
    background:`url("${resolveDakUrl(props.itemStats.itemInfo.backgroundImageUrl)}")`
  };

  return <>
    <div className="item-row">
      <div className="img">
        <div className="item-contain" ref={refs.setReference} {...getReferenceProps}
          style={itemContainStyles}
        >
          <img src={resolveDakUrl(props.itemStats.itemInfo.imageUrl)}/>
        </div>
      </div>

      <div className="detail">
        <div className="main-details">
          <h1>{props.itemStats.itemInfo.name}</h1>
          <div className="sort-stat">
            {r_sortStat()}
          </div>
        </div>

        <div className="sub-details">
          {r_subDetails()}
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