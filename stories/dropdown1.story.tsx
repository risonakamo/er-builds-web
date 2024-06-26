import type {Meta,StoryObj} from "@storybook/react";

import {Dropdown1} from "components/dropdown1/dropdown1";
import {useState} from "react";

type Story=StoryObj<typeof Dropdown1>;

const meta:Meta<typeof Dropdown1>={
  title:"dropdown1",
  component:Dropdown1,
  args:{
    options:[
      {
        value:"DebiMarlene",
        img:"https://cdn.dak.gg/assets/er/game-assets/1.19.0/CharCommunity_DebiMarlene_S000.png",
        displayText:"Debi/Marlene",
      },
      {
        value:"Tia",
        img:"https://cdn.dak.gg/assets/er/game-assets/1.19.0/CharCommunity_Tia_S000.png",
      }
    ]
  },

  render:(props)=>{
    const [currentSelection,setCurrentSelection]=useState<string|null>(null);

    function h_selectionChange(newSelection:string):void
    {
      setCurrentSelection(newSelection);
    }

    return <Dropdown1 {...props} currentSelection={currentSelection}
      onSelectionChange={h_selectionChange}/>;
  }
};
export default meta;

export const normal:Story={

};