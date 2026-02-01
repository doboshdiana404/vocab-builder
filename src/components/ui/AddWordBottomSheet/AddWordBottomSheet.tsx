import Close from "@/assets/icons/close.svg";
import { AddWordForm } from "@/src/features/words/components/AddWordForm/AddWordForm";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { styles } from "./AddWordBottomSheet.styles";

export interface AddWordBottomSheetRef {
  open: () => void;
  close: () => void;
}

const AddWordBottomSheet = forwardRef<AddWordBottomSheetRef, {}>((_, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={handleClose} />

        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Close width={24} />
          </TouchableOpacity>

          <AddWordForm onSuccess={handleClose} onCancel={handleClose} />
        </View>
      </View>
    </Modal>
  );
});

AddWordBottomSheet.displayName = "AddWordBottomSheet";

export default AddWordBottomSheet;
