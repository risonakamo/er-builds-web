// lib for helping with item type related stuff

import armItemIcon from "assets/arm-item.webp";
import headItemIcon from "assets/head-item.webp";
import chestItemIcon from "assets/chest-item.webp";
import weaponItemIcon from "assets/weapon-item.webp";
import legItemIcon from "assets/leg-item.webp";
import augmentItemIcon from "assets/augment-item.png";
import tacItemIcon from "assets/tacskill-item.png";
import lateItemIcon from "assets/late-item.png";

/** convert itemtype enum to its corresponding icon */
export const ItemTypeToIcon:Record<ItemType,string>={
    "arm":armItemIcon,
    "head":headItemIcon,
    "chest":chestItemIcon,
    "weapon":weaponItemIcon,
    "leg":legItemIcon,
    "tacskill":tacItemIcon,
    "augment":augmentItemIcon,
    "late":lateItemIcon,
};

export const ItemTypeToTooltip:Record<ItemType,string>={
    "arm":"Arm",
    "head":"Head",
    "chest":"Chest",
    "weapon":"Weapon",
    "leg":"Leg",
    "tacskill":"Tactical Skill",
    "augment":"Augment",
    "late":"Late Game Item",
};

/** item type enum in array form */
export const ItemTypes_all:ItemType[]=[
    "weapon",
    "chest",
    "head",
    "arm",
    "leg",
    "tacskill",
    "augment",
    "late",
];