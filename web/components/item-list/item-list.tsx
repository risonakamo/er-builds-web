import {useEffect, useRef, useState} from "react";
import _ from "lodash";

import {ItemRow} from "components/item-row/item-row";

import {allItemStatSortOptions,getSortableField} from "lib/er-data-lib";

import "./item-list.less";

interface ItemListProps
{
  itemStats:ItemsStatistics[]

  sortField:ItemStatsSortField
  onSortFieldChange(newField:ItemStatsSortField):void

  listIcon:string
  listIconTooltip:string
}

export function ItemList(props:ItemListProps):JSX.Element
{
  const itemList_ref=useRef<HTMLDivElement>(null);

  // on sort field change, scroll to top
  useEffect(()=>{
    if (itemList_ref.current)
    {
      itemList_ref.current.scrollTop=0;
    }
  },[props.sortField]);


  // --- handlers
  /** sort select was changed. set the new sort field */
  function h_sortSelectChange(e:React.ChangeEvent<HTMLSelectElement>):void
  {
    props.onSortFieldChange(e.target.value as ItemStatsSortField);
  }



  // --- sub renders
  /** render list of item rows */
  function r_itemslist():JSX.Element[]
  {
    return _(props.itemStats)
      .sortBy((itemstat:ItemsStatistics):number|string=>{
        return getSortableField(itemstat,props.sortField).value;
      })
      .reverse()
      .map((itemstat:ItemsStatistics):JSX.Element=>{
        return <ItemRow itemStats={itemstat} sortStat={props.sortField} key={itemstat.itemInfo.id}/>;
      })
      .value();
  }

  /** render the options of the sort selector */
  function r_sortOptions():JSX.Element[]
  {
    return _.map(allItemStatSortOptions,(sortOption:ItemStatsSortOption):JSX.Element=>{
      return <option key={sortOption.field} value={sortOption.field}>
        {sortOption.displayName}
      </option>;
    });
  }



  // --- main render
  return <div className="item-list">
    <div className="header">
      <div className="type-header">
        <div className="img-contain">
          <img src={props.listIcon} title={props.listIconTooltip}/>
        </div>
      </div>
      <div className="sort-zone">
        <select value={props.sortField} onChange={h_sortSelectChange}>
          {r_sortOptions()}
        </select>
      </div>
    </div>
    <div className="list" ref={itemList_ref}>
      {r_itemslist()}
    </div>
  </div>;
}