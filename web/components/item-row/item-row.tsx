import "./item-row.less";

interface ItemRowProps
{

}

export function ItemRow(props:ItemRowProps):JSX.Element
{
  return <div className="item-row">
    <div className="img">

    </div>
    <div className="detail">
      <div className="main-details">
        <div className="title">Something</div>
        <div className="sub-details">
          <div className="detail-item">Builds: 10</div>
          <div className="detail-item">Likes: 12</div>
        </div>
      </div>
      <div className="sort-stat">
        40
      </div>
    </div>
  </div>;
}