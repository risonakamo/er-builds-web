import {atom} from "jotai";

export const selectedCharacterAtm=atom<string|null>(null);
export const selectedWeaponAtm=atom<string|null>(null);
export const lastItemSortAtm=atom<ItemStatsSortField|null>(null);