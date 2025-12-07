import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import CategoryPicker from "@/src/components/ui/CategoryPicker/CategoryPicker";
import Input from "@/src/components/ui/Input/Input";
import VerbTypeSelector from "@/src/components/ui/VerbTypeSelector/VerbTypeSelector";
import { useAddWordMutation, useGetCategoriesQuery } from "@/src/store/api";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { addWordStyles as styles } from "./AddWord.style";
import { ItemType } from "./types";

const enRegex = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const uaRegex = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ',\s]+$/u;

export default function AddWordScreen() {
  const router = useRouter();
  const { data: categories = [], isLoading } = useGetCategoriesQuery(null);
  const [addWord, { isLoading: creating }] = useAddWordMutation();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const [verbType, setVerbType] = useState<string | null>(null);
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [errors, setErrors] = useState<{ en?: string; ua?: string }>({});
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isLoading && categories?.length) {
      const mapped = categories.map((cat: any) => ({
        label: cat.name || cat,
        value: cat.name || cat,
      }));
      setItems(mapped);
      if (!category) setCategory(mapped[0]?.value);
    }
  }, [categories, isLoading]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!en.trim()) newErrors.en = "Обов’язкове поле";
    else if (!enRegex.test(en.trim()))
      newErrors.en = "Тільки латиниця, апостроф, дефіс і пробіли";

    if (!ua.trim()) newErrors.ua = "Обов’язкове поле";
    else if (!uaRegex.test(ua.trim()))
      newErrors.ua = "Тільки українські літери і пробіли";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const body: any = { en: en.trim(), ua: ua.trim(), category };
      if (category?.toLowerCase() === "verb" && verbType) {
        body.isIrregular = verbType === "irregular";
      }
      await addWord(body).unwrap();
      Alert.alert("✅ Успіх", "Слово успішно додано!");
      setEn("");
      setUa("");
      setVerbType(null);
      setErrors({});
      setCategory(items[0]?.value || "");

      router.replace("/");
    } catch (err: any) {
      const msg =
        err?.data?.message || err?.error || "Помилка при створенні слова";
      Alert.alert("❌ Помилка", msg);
    }
  };

  const handleCancel = () => {
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add word</Text>

      <Text style={styles.description}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </Text>

      <CategoryPicker
        open={open}
        setOpen={setOpen}
        value={category}
        setValue={setCategory}
        items={items}
      />

      {category?.toLowerCase() === "verb" && (
        <>
          <VerbTypeSelector verbType={verbType} setVerbType={setVerbType} />

          <View style={{ marginTop: 8 }}>
            {verbType === "irregular" ? (
              <Text
                style={{
                  color: "#121417",
                  fontSize: 10,
                  fontFamily: "FixelDisplayRegular",
                }}
              >
                Such data must be entered in the format I form-II form-III form.
              </Text>
            ) : (
              <Text style={{ opacity: 0, height: 9.6 }}>placeholder</Text>
            )}
          </View>
        </>
      )}

      <View style={styles.fieldContainer}>
        <Input
          label="Ukrainian"
          icon={<Ukraine width={28} height={28} />}
          value={ua}
          onChangeText={setUa}
          placeholder="Українське слово"
          error={errors.ua}
        />
      </View>

      <Input
        label="English"
        icon={<UnitedKingdom width={28} height={28} />}
        value={en}
        onChangeText={setEn}
        placeholder="English word"
        error={errors.en}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={creating}
        style={[styles.submitButton, creating && { opacity: 0.6 }]}
      >
        <Text style={styles.submitText}>
          {creating ? "Додається..." : "Add"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
