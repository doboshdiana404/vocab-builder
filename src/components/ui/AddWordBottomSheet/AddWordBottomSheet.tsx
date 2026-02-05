import Close from "@/assets/icons/close.svg";
import AndroidModal from "@/src/components/ui/AndroidModal/AndroidModal";
import { AddWordForm } from "@/src/features/words/components/AddWordForm/AddWordForm";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { TouchableOpacity } from "react-native";
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

  const handleClose = () => setVisible(false);

  return (
    <AndroidModal visible={visible} onClose={handleClose}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleClose}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Close width={24} />
      </TouchableOpacity>

      <AddWordForm onSuccess={handleClose} onCancel={handleClose} />
    </AndroidModal>
  );
});

AddWordBottomSheet.displayName = "AddWordBottomSheet";

export default AddWordBottomSheet;
