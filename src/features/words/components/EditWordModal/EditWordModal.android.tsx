import Close from "@/assets/icons/close.svg";
import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";

import { useUpdateWordMutation } from "@/src/store/api";
import { useToast } from "expo-toast";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import Input from "@/src/components/ui/Input/Input";
import { styles } from "./EditWordModalAndroid.styles";
import { EditWordModalProps, FormErrors } from "./types";

export default function EditWordModalAndroid({
  visible,
  onClose,
  word,
}: EditWordModalProps) {
  const [ua, setUa] = useState(word.ua);
  const [en, setEn] = useState(word.en);
  const [errors, setErrors] = useState<FormErrors>({});
  const toast = useToast();

  const [updateWord, { isLoading }] = useUpdateWordMutation();

  useEffect(() => {
    setUa(word.ua);
    setEn(word.en);
  }, [word._id]);

  const handleSave = async () => {
    if (!ua.trim() || !en.trim()) return;

    try {
      await updateWord({
        id: word._id,
        body: {
          ua: ua.trim(),
          en: en.trim(),
          category: word.category,
          isIrregular: word.isIrregular,
        },
      }).unwrap();

      toast.show("Word updated", { duration: 1000 });
      onClose();
    } catch {
      toast.show("Error updating word", { duration: 2000 });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropPressable}
          activeOpacity={1}
          onPress={onClose}
          onPressOut={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        />
        <View style={styles.modal} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Close width={24} height={24} />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Input
              label="Ukrainian"
              icon={<Ukraine width={24} height={24} />}
              value={ua}
              onChangeText={setUa}
              stable
              changeColor="#fcfcfc"
              borderChangeColor="#d1d5db"
            />
          </View>
          <Input
            label="English"
            icon={<UnitedKingdom width={24} height={24} />}
            value={en}
            onChangeText={setEn}
            stable
            changeColor="#fcfcfc"
            borderChangeColor="#d1d5db"
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
