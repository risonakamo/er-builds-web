import {createRoot} from "react-dom/client";

import "./index.less";

function IndexPage():JSX.Element
{
  return <>
    hello
  </>;
}

function main()
{
  createRoot(document.querySelector("main")!).render(<IndexPage/>);
}

window.onload=main;