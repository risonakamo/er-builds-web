import testbat from "assets/test-bat.webp";

import "./item-row.less";

interface ItemRowProps
{

}

export function ItemRow(props:ItemRowProps):JSX.Element
{
  return <div className="item-row">
    <div className="img">
      <div className="item-contain">
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
  </div>;
}