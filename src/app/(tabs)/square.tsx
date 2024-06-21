import { between, vec } from "@/src/utils";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const WIDTH = 100;
const HEIGHT = 100;

export default function Page() {
  const window = useWindowDimensions();
  const isSelected = useSharedValue(false);
  const translate = useSharedValue(
    vec((window.width - WIDTH) / 2, (window.height - HEIGHT) / 2)
  );
  const transition = useSharedValue(0);
  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        transition.value,
        [0, 1],
        ["blue", "orange"]
      ),
      transform: [
        { translateX: translate.value.x },
        { translateY: translate.value.y },
        { rotate: interpolate(transition.value, [0, 1], [0, 45]) + "deg" },
        { scale: interpolate(transition.value, [0, 1], [1, 1.2]) },
      ],
    };
  }, []);

  useAnimatedReaction(
    () => isSelected.value,
    (isSelected) => {
      transition.value = withSpring(isSelected ? 1 : 0);
    },
    []
  );

  const pan = Gesture.Pan()
    .onBegin(({ x, y }) => {
      if (
        between(x, translate.value.x, translate.value.x + WIDTH) &&
        between(y, translate.value.y, translate.value.y + HEIGHT)
      ) {
        isSelected.value = true;
      }
    })
    .onChange(({ changeX, changeY }) => {
      if (isSelected.value) {
        const tx = translate.value.x + changeX;
        const ty = translate.value.y + changeY;
        translate.value = vec(tx, ty);
      }
    })
    .onFinalize(() => {
      isSelected.value = false;
    });

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container} collapsable={false}>
        <Animated.View
          style={[
            {
              position: "absolute",
              width: WIDTH,
              height: HEIGHT,
              borderRadius: 16,
            },
            uas,
          ]}
        />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
