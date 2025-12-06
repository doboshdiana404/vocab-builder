import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";

import { useUpdateWordMutation } from "@/src/store/api";
import React, { JSX, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import SwipeableBottomSheet from "../SwipeableBottomSheet/SwipeableBottomSheet";
import { editWordModalStyles as styles } from "./EditWordModal.styles";

type Word = {
  _id: string;
  ua: string;
  en: string;
  category: string;
  isIrregular?: boolean;
};

type EditWordModalProps = {
  visible: boolean;
  onClose: () => void;
  word: Word;
};

type FormErrors = {
  ua?: string;
  en?: string;
};

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Ukraine width={28} height={28} />
          <Text style={{ marginLeft: 8 }}>Ukrainian</Text>
        </View>
        <TextInput
          value={ua}
          onChangeText={handleUaChange}
          placeholder="Українське слово"
          placeholderTextColor="#121417"
          style={{
            borderWidth: 1,
            borderColor: errors.ua ? "#FF6B6B" : "rgba(18, 20, 23, 0.1)",
            padding: 8,
            borderRadius: 6,
          }}
        />
        {errors.ua && <Text style={{ color: "#FF6B6B" }}>{errors.ua}</Text>}
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <UnitedKingdom width={28} height={28} />
          <Text style={{ marginLeft: 8 }}>English</Text>
        </View>
        <TextInput
          value={en}
          onChangeText={handleEnChange}
          placeholder="English word"
          placeholderTextColor="#121417"
          style={{
            borderWidth: 1,
            borderColor: errors.en ? "#FF6B6B" : "rgba(18, 20, 23, 0.1)",
            padding: 8,
            borderRadius: 6,
          }}
        />
        {errors.ua && <Text style={{ color: "#FF6B6B" }}>{errors.ua}</Text>}
      </View>

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
