import Edit from "@/assets/icons/edit.svg";
import Trash from "@/assets/icons/trash.svg";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { wordsTableStyles as styles } from "./WordsTable.styles";
import { WordActionsModalProps } from "./types";

export default function WordActionsModal({
  isVisible,
  position,
  onClose,
  onEdit,
  onDelete,
}: WordActionsModalProps) {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            { position: "absolute", top: position.top, left: position.left },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              onClose();
              onEdit();
            }}
          >
            <Text style={styles.modalAction}>
              <Edit width={16} height={16} /> Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.modalAction}>
              <Trash width={16} height={16} /> Delete
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
