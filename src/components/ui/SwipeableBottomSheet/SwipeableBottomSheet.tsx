import { Portal } from "@gorhom/portal";
import React, { JSX, ReactNode, useEffect } from "react";
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./SwipeableBottomSheet.styles";
const SHEET_HEIGHT = 408;
const CLOSED_POSITION = SHEET_HEIGHT;
const OPEN_POSITION = 0;

type SwipeableBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function SwipeableBottomSheet({
  visible,
  onClose,
  children,
}: SwipeableBottomSheetProps): JSX.Element | null {
  const translateY: SharedValue<number> = useSharedValue(CLOSED_POSITION);
  const keyboardOffset: SharedValue<number> = useSharedValue(0);

  const closeSheet = (): void => {
    translateY.value = withTiming(CLOSED_POSITION, { duration: 250 });
    setTimeout(() => {
      onClose();
    }, 250);
  };

  useEffect((): (() => void) => {
    if (visible) {
      translateY.value = OPEN_POSITION;
    }

    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        keyboardOffset.value = e.endCoordinates.height - 104;
      },
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        keyboardOffset.value = 0;
      },
    );

    return (): void => {
      showSub.remove();
      hideSub.remove();
    };
  }, [visible, keyboardOffset, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value - keyboardOffset.value,
      },
    ],
  }));

  if (!visible) return null;

  return (
    <Portal>
      <GestureHandlerRootView style={styles.root}>
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.handle} />

          <View pointerEvents="box-none" style={{ flex: 1 }}>
            {children}
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </Portal>
  );
}
