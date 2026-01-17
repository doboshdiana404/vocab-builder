import React from "react";
import { Modal, Text } from "react-native";

type NavigationMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export default function NavigationMenu({
  visible,
  onClose,
}: NavigationMenuProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Text>Navigation</Text>
    </Modal>
  );
}
