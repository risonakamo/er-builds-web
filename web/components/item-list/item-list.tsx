import _ from "lodash";

import {ItemRow} from "components/item-row/item-row";

import "./item-list.less";

interface ItemListProps
{
  itemStats:ItemsStatistics[]
}

export function ItemList(props:ItemListProps):JSX.Element
{
  /** render list of item rows */
  function r_itemslist():JSX.Element[]
  {
    return _.map(props.itemStats,(itemstat:ItemsStatistics):JSX.Element=>{
      return <ItemRow itemStats={itemstat} sortStat="builds" key={itemstat.itemInfo.id}/>;
    });
  }

  return <div className="item-list">
    <div className="header">
      <div className="type-header">

      </div>
      <div className="sort-zone">
        <select>
          <option>Builds</option>
          <option>Build Percent</option>
          <option>Likes</option>
        </select>
      </div>
    </div>
    <div className="list">
      {r_itemslist()}
    </div>
  </div>;
}