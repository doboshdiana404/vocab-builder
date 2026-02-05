import React, { ReactNode } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { styles } from "./AndroidModal.styles";

type AndroidModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  backgroundColor?: string;
};

export default function AndroidModal({
  visible,
  onClose,
  children,
  backgroundColor = "#85AA9F",
}: AndroidModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropPressable}
          activeOpacity={1}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        />

        <View style={[styles.modal, { backgroundColor }]}>{children}</View>
      </View>
    </Modal>
  );
}
