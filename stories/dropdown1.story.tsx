import type {Meta,StoryObj} from "@storybook/react";

import {Dropdown1} from "components/dropdown1/dropdown1";

type Story=StoryObj<typeof Dropdown1>;

const meta:Meta<typeof Dropdown1>={
  title:"dropdown1",
  component:Dropdown1,
  args:{

  }
};
export default meta;

export const normal:Story={

};