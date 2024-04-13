import type {Meta,StoryObj} from "@storybook/react";

import {ItemList} from "components/item-list/item-list";
import {itemStatsExample1, itemStatsExample2} from "lib/sample-data";

type Story=StoryObj<typeof ItemList>;

const meta:Meta<typeof ItemList>={
  title:"item list",
  component:ItemList,
  args:{
    itemStats:itemStatsExample1
  }
};
export default meta;

export const normal:Story={

};

export const list2:Story={
  args:{
    itemStats:itemStatsExample2
  }
};