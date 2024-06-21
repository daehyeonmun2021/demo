import { List } from "@/src/components";
import { useToggleItem } from "@/src/hooks";
import { Item, selectedItemsAtom } from "@/src/states";
import { useAtomValue } from "jotai";
import { StyleSheet, View } from "react-native";

export default function Page() {
  const selectedItems = useAtomValue<Item[]>(selectedItemsAtom);
  const { toggleItem } = useToggleItem();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: 10,
        },
      ]}
    >
      <List items={selectedItems} handleSelectItem={toggleItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
