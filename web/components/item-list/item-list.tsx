import {useState} from "react";
import _ from "lodash";

import {ItemRow} from "components/item-row/item-row";

import {allItemStatSortOptions,getSortableField} from "lib/er-data-lib";

import HeadItemImg from "assets/head-item.webp";
import "./item-list.less";

interface ItemListProps
{
  itemStats:ItemsStatistics[]
}

export function ItemList(props:ItemListProps):JSX.Element
{
  const [sortField,setSortField]=useState<ItemStatsSortField>("builds");

  /** sort select was changed. set the new sort field */
  function h_sortSelectChange(e:React.ChangeEvent<HTMLSelectElement>):void
  {
    setSortField(e.target.value as ItemStatsSortField);
  }

  /** render list of item rows */
  function r_itemslist():JSX.Element[]
  {
    return _(props.itemStats)
      .sortBy((itemstat:ItemsStatistics):number|string=>{
        return getSortableField(itemstat,sortField).value;
      })
      .reverse()
      .map((itemstat:ItemsStatistics):JSX.Element=>{
        return <ItemRow itemStats={itemstat} sortStat={sortField} key={itemstat.itemInfo.id}/>;
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

  return <div className="item-list">
    <div className="header">
      <div className="type-header">
        <div className="img-contain">
          <img src={HeadItemImg}/>
        </div>
      </div>
      <div className="sort-zone">
        <select value={sortField} onChange={h_sortSelectChange}>
          {r_sortOptions()}
        </select>
      </div>
    </div>
    <div className="list">
      {r_itemslist()}
    </div>
  </div>;
}