import { StyleSheet, View } from "react-native";

import { List } from "@/src/components";
import { Item, itemsAtom } from "@/src/states";
import { useAtom } from "jotai";
import { useCallback } from "react";

export default function Page() {
  const [items, setItems] = useAtom<Item[]>(itemsAtom);

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
      <List items={items} handleSelectItem={handleSelectItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
