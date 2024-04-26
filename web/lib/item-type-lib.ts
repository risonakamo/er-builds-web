// lib for helping with item type related stuff

import armItemIcon from "assets/arm-item.webp";
import headItemIcon from "assets/head-item.webp";
import chestItemIcon from "assets/chest-item.webp";
import weaponItemIcon from "assets/weapon-item.webp";
import legItemIcon from "assets/leg-item.webp";

/** convert itemtype enum to its corresponding icon */
export const ItemTypeToIcon:Record<ItemType,string>={
    "arm":armItemIcon,
    "head":headItemIcon,
    "chest":chestItemIcon,
    "weapon":weaponItemIcon,
    "leg":legItemIcon,
};

export const ItemTypeToTooltip:Record<ItemType,string>={
    "arm":"Arm",
    "head":"Head",
    "chest":"Chest",
    "weapon":"Weapon",
    "leg":"Leg",
};