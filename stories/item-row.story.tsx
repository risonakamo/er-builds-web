import type {Meta,StoryObj} from "@storybook/react";

import {ItemRow} from "components/item-row/item-row";
import {itemStatsExample1} from "lib/sample-data";

type Story=StoryObj<typeof ItemRow>;

const meta:Meta<typeof ItemRow>={
  title:"item row",
  component:ItemRow,
  args:{
    itemStats:itemStatsExample1[0],
    sortStat:"builds"
  }
};
export default meta;

export const normal:Story={

};