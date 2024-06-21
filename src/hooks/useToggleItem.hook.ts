import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { Item, itemsAtom } from "../states";

export const useToggleItem = () => {
  const setItems = useSetAtom(itemsAtom);
  const toggleItem = useCallback((item: Item) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        if (prevItem.id === item.id) {
          return {
            ...prevItem,
            isSelected: !prevItem.isSelected,
          };
        }
        return prevItem;
      })
    );
  }, []);

  return {
    toggleItem,
  };
};
