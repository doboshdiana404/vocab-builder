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
const SNAP_TOP = 0;
const SNAP_BOTTOM = SHEET_HEIGHT;

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
  const translateY: SharedValue<number> = useSharedValue(SNAP_BOTTOM);
  const keyboardOffset: SharedValue<number> = useSharedValue(0);

  const closeSheet = (): void => {
    translateY.value = withTiming(SNAP_BOTTOM, { duration: 250 });
    setTimeout(() => {
      onClose();
    }, 250);
  };

  useEffect((): (() => void) => {
    if (visible) {
      translateY.value = SNAP_TOP;
    }

    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        keyboardOffset.value = e.endCoordinates.height - 104;
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        keyboardOffset.value = 0;
      }
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
