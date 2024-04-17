import {createRoot} from "react-dom/client";
import {useEffect} from "react";

import {getBuilds} from "apis/er-builds-api";

import "./index.less";

function IndexPage():JSX.Element
{
  useEffect(()=>{
    (async ()=>{
      console.log(await getBuilds("Tia","Bat"));
    })();
  });

  return <>
    hello
  </>;
}

function main()
{
  createRoot(document.querySelector("main")!).render(<IndexPage/>);
}

window.onload=main;