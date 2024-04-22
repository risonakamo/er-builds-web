import {createRoot} from "react-dom/client";
import {useQuery,QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {atom,useAtom} from "jotai";
import {useState} from "react";

import {ItemList} from "components/item-list/item-list";
import {BuildSelector} from "components/build-selector/build-selector";

import {getBuilds,getDatafiles} from "apis/er-builds-api";

import "./index.less";

// --- atoms
export const selectedCharacterAtm=atom<string|null>(null);
export const selectedWeaponAtm=atom<string|null>(null);

function IndexPage():JSX.Element
{
  const [selectedCharacter,setSelectedCharacter]=useAtom<string|null>(selectedCharacterAtm);
  const [selectedWeapon,setSelectedWeapon]=useAtom<string|null>(selectedWeaponAtm);

  const buildsDataQy=useQuery<GroupedItemStatistics>({
    queryKey:["Tia","Bat"],
    enabled:!!(
      selectedCharacter
      && selectedWeapon
    ),

    initialData:{
      weapon:[],
      head:[],
      chest:[],
      arm:[],
      leg:[],
    },

    async queryFn():Promise<GroupedItemStatistics>
    {
      if (!selectedCharacter || !selectedWeapon)
      {
        throw "missing selections";
      }

      const data=await getBuilds(selectedCharacter,selectedWeapon);
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