import { ItemType } from "@/src/components/ui/CategoryPicker/types";
import { useGetCategoriesQuery } from "@/src/features/categories/api/categoriesApi";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AddWordRequest } from "../api/types";
import { useAddWordMutation } from "../api/wordsApi";
import { validateAddWord } from "../validation/addWord.validation";

interface UseAddWordFormProps {
  onSuccess?: () => void;
}

export function useAddWordForm(props?: UseAddWordFormProps) {
  const onSuccess = props?.onSuccess;

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery(null);
  const [addWord, { isLoading }] = useAddWordMutation();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const [verbType, setVerbType] = useState<string | null>(null);
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [errors, setErrors] = useState<{ en?: string; ua?: string }>({});

  useEffect(() => {
    if (!categoriesLoading && categories.length) {
      const mapped = categories.map((cat: any) => ({
        label: cat.name || cat,
        value: cat.name || cat,
      }));
      setItems(mapped);
      if (!category) {
        setCategory(mapped[0]?.value);
      }
    }
  }, [categories, categoriesLoading, category]);

  const submit = async () => {
    const validationErrors = validateAddWord(en, ua);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const body: AddWordRequest = { en: en.trim(), ua: ua.trim(), category };
    if (category?.toLowerCase() === "verb" && verbType) {
      body.isIrregular = verbType === "irregular";
    }

    try {
      await addWord(body).unwrap();
      Alert.alert("✅ Успіх", "Слово успішно додано!");

      setEn("");
      setUa("");
      setVerbType(null);
      setErrors({});
      setCategory(items[0]?.value || "");

      onSuccess?.();
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Помилка при створенні слова";
      Alert.alert("❌ Помилка", msg);
    }
  };

  return {
    state: {
      open,
      category,
      items,
      verbType,
      en,
      ua,
      errors,
      isLoading,
    },
    actions: {
      setOpen,
      setCategory,
      setVerbType,
      setEn,
      setUa,
      submit,
    },
  };
}
