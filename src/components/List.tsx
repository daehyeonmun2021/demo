import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Item } from "../states";

type ListProps<T> = {
  items: T[];
  handleSelectItem: (item: T) => void;
};

export const List = <ItemT extends Item>({
  items,
  handleSelectItem,
}: ListProps<ItemT>) => {
  const keyExtractor = useCallback((item: Item) => "item" + item.id, []);

  const renderListItem = useCallback(({ item }: ListRenderItemInfo<ItemT>) => {
    return <ListItem key={item.id} item={item} onSelect={handleSelectItem} />;
  }, []);

  return (
    <FlashList
      data={items}
      estimatedItemSize={HEIGHT}
      keyExtractor={keyExtractor}
      renderItem={renderListItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const HEIGHT = 100;

const ItemSeparator = () => (
  <View style={{ height: 12, backgroundColor: "white" }} />
);

type ListItemProps<ItemT> = {
  item: ItemT;
  onSelect: (item: ItemT) => void;
};

const ListItem = <ItemT extends Item>({
  item,
  onSelect,
}: ListItemProps<ItemT>) => {
  return (
    <Pressable onPress={() => onSelect(item)}>
      <Animated.View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: HEIGHT,
          backgroundColor: item.isSelected ? "black" : "blue",
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          {item.id}
        </Text>
      </Animated.View>
    </Pressable>
  );
};
