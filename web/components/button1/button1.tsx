import {clsx} from "clsx";

import "./button1.less";

interface Button1Props
{
  text:string
  className?:string
  onClick?():void
}

export function Button1(props:Button1Props):JSX.Element
{
  return <div className={clsx("button1",props.className)} onClick={props.onClick}>
    {props.text}
  </div>;
}