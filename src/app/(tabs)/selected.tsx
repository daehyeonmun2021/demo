import { List } from "@/src/components";
import { Item, itemsAtom, selectItemsAtom } from "@/src/states";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

export default function Page() {
  const selectedItems = useAtomValue<Item[]>(selectItemsAtom);
  const setItems = useSetAtom(itemsAtom);
  const handleSelectItem = useCallback((item: Item) => {
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

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: 10,
        },
      ]}
    >
      <List items={selectedItems} handleSelectItem={handleSelectItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
