import { atom } from "jotai";

const TOTAL_ITEMS = 100;

export interface Item {
  id: number;
  isSelected: boolean;
}

export const itemsAtom = atom<Item[]>(
  Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
    id: i,
    isSelected: false,
  }))
);

export const selectedItemsAtom = atom<Item[]>((get) => {
  const items = get(itemsAtom);
  return items.filter((item) => item.isSelected);
});
