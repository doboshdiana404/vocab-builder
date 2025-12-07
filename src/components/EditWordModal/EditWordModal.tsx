import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";

import { useUpdateWordMutation } from "@/src/store/api";
import React, { JSX, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SwipeableBottomSheet from "../SwipeableBottomSheet/SwipeableBottomSheet";
import Input from "../ui/Input/Input";
import { editWordModalStyles as styles } from "./EditWordModal.styles";
import { EditWordModalProps, FormErrors } from "./types";

export default function EditWordModal({
  visible,
  onClose,
  word,
}: EditWordModalProps): JSX.Element {
  const [ua, setUa] = useState<string>(word.ua);
  const [en, setEn] = useState<string>(word.en);
  const [errors, setErrors] = useState<FormErrors>({});
  const UA_REGEX = /^[А-Яа-яЇїІіЄєҐґ'’\s-]*$/;
  const EN_REGEX = /^[A-Za-z'-\s]*$/;

  const [updateWord, { isLoading }] = useUpdateWordMutation();

  useEffect((): void => {
    setUa(word.ua);
    setEn(word.en);
  }, [word._id, word.ua, word.en]);

  const handleUaChange = (text: string) => {
    setUa(text);
    if (errors.ua) {
      setErrors((prev) => ({ ...prev, ua: undefined }));
    }
  };

  const handleEnChange = (text: string) => {
    setEn(text);
    if (errors.en) {
      setErrors((prev) => ({ ...prev, en: undefined }));
    }
  };

  const handleSave = async (): Promise<void> => {
    const newErrors: FormErrors = {};

    if (!ua.trim()) {
      newErrors.ua = "Поле не може бути пустим";
    } else if (!UA_REGEX.test(ua.trim())) {
      newErrors.ua = "Недопустимі символи";
    }

    if (!en.trim()) {
      newErrors.en = "Field cannot be empty";
    } else if (!EN_REGEX.test(en.trim())) {
      newErrors.en = "Invalid characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

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

      onClose();
    } catch (err) {
      const error = err as {
        status?: number;
        data?: { message?: string };
      };

      const message =
        error?.data?.message || "Failed to update word. Please try again.";
    }
  };

  return (
    <SwipeableBottomSheet visible={visible} onClose={onClose}>
      <View style={{ marginBottom: 24 }}>
        <Input
          label="Ukrainian"
          icon={<Ukraine width={28} height={28} />}
          value={ua}
          onChangeText={handleUaChange}
          placeholder="Українське слово"
          error={errors.ua}
          stable={true}
        />
      </View>
      <Input
        label="English"
        icon={<UnitedKingdom width={28} height={28} />}
        value={en}
        onChangeText={handleEnChange}
        placeholder="English word"
        error={errors.en}
        stable={true}
      />
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        disabled={isLoading}
      >
        <Text style={styles.saveText}>{isLoading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </SwipeableBottomSheet>
  );
}
