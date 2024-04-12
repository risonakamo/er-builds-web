import type {Meta,StoryObj} from "@storybook/react";

import {ItemRow} from "components/item-row/item-row";

type Story=StoryObj<typeof ItemRow>;

const meta:Meta<typeof ItemRow>={
  title:"item row",
  component:ItemRow,
  args:{

  }
};
export default meta;

export const normal:Story={

};