import {createRoot} from "react-dom/client";
import {useQuery,QueryClient,QueryClientProvider} from "@tanstack/react-query";

import {ItemList} from "components/item-list/item-list";
import {BuildSelector} from "components/build-selector/build-selector";

import {getBuilds,getDatafiles} from "apis/er-builds-api";

import "./index.less";

function IndexPage():JSX.Element
{
  const buildsDataQy=useQuery<GroupedItemStatistics>({
    queryKey:["Tia","Bat"],

    initialData:{
      weapon:[],
      head:[],
      chest:[],
      arm:[],
      leg:[],
    },

    async queryFn():Promise<GroupedItemStatistics>
    {
      const data=await getBuilds("DebiMarlene","TwoHandSword");
      console.log(data);
      return data;
    }
  });

  const datafilesQy=useQuery<ErDataFileDescriptor[]>({
    queryKey:["datafiles"],
    initialData:[],

    async queryFn():Promise<ErDataFileDescriptor[]>
    {
      const data=await getDatafiles();
      console.log("datafiles",data);
      return data;
    }
  });

  return <>
    <div className="top-header">
      <BuildSelector datafiles={datafilesQy.data}/>
    </div>
    <div className="item-lists">
      <ItemList itemStats={buildsDataQy.data.weapon}/>
      <ItemList itemStats={buildsDataQy.data.head}/>
      <ItemList itemStats={buildsDataQy.data.chest}/>
      <ItemList itemStats={buildsDataQy.data.arm}/>
      <ItemList itemStats={buildsDataQy.data.leg}/>
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector("main")!).render(
    <QueryClientProvider client={new QueryClient()}>
      <IndexPage/>
    </QueryClientProvider>
  );
}

window.onload=main;