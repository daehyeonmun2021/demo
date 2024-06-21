import { StyleSheet, View } from "react-native";

import { List } from "@/src/components";
import { useToggleItem } from "@/src/hooks";
import { Item, itemsAtom } from "@/src/states";
import { useAtomValue } from "jotai";

export default function Page() {
  const items = useAtomValue<Item[]>(itemsAtom);
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
      <List items={items} handleSelectItem={toggleItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
