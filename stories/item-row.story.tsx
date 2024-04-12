import type {Meta,StoryObj} from "@storybook/react";

import {ItemRow} from "components/item-row/item-row";

type Story=StoryObj<typeof ItemRow>;

const meta:Meta<typeof ItemRow>={
  title:"item row",
  component:ItemRow,
  args:{
    itemStats:{
      itemInfo: {
        id: 120406,
        name: "Red Panther",
        tooltip: "Epic / Rapier\n\nAttack Power +28\nSkill Amplification +70\nMax HP +80\n\n[Healing Reduction - Weak]\nDealing damage to a target reduces their healing by 40% for 4 seconds.\n\nMax quantity : 1\n\nA crimson blade capable of slashing through humans, much like its namesake.",
        imageUrl: "/assets/er/game-assets/1.19.0/ItemIcon_120406.png",
        backgroundImageUrl: "/er/images/item/ico-itemgradebg-04.svg",
        itemType: "weapon"
      },
      totalBuilds: 43,
      buildsPercentage: 0,
      likes: 0,
      totalWinRate: 203.91000366210938,
      averageWinRate: 4.742093086242676,
      highestWinRate: 66.66999816894531
    },
    sortStat:"builds"
  }
};
export default meta;

export const normal:Story={

};