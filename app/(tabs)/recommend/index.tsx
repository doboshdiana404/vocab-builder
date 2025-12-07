import Dashboard from "@/src/components/Dashboard/Dashboard";
import WordsTable from "@/src/components/WordsTable/WordsTable";
import { useAddWordMutation, useGetAllWordsQuery } from "@/src/store/api";
import { useToast } from "expo-toast";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState, Word } from "./types";

export default function RecommendScreen() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [verbType, setVerbType] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [addWord] = useAddWordMutation();
  const toast = useToast();

  const { data, isLoading, refetch } = useGetAllWordsQuery(
    {
      ...(search ? { keyword: search } : {}),
      ...(category ? { category } : {}),
      ...(verbType ? { isIrregular: verbType === "irregular" } : {}),
      page,
      limit: 7,
    },
    { skip: !token }
  );

  const handleAddWord = async (word: Word) => {
    try {
      const payload: any = {
        en: word.en,
        ua: word.ua,
        category: word.category,
      };

      if (word.category === "verb") {
        payload.isIrregular = word.isIrregular === true;
      }

      await addWord(payload).unwrap();

      toast.show("Word added successfully!", {
        containerStyle: { backgroundColor: "rgba(5, 131, 62, 0.5)" },
        duration: 1000,
      });

      refetch();
      return true;
    } catch (err: any) {
      if (err?.status === 409) {
        toast.show("This word is already in your dictionary.", {
          containerStyle: { backgroundColor: "rgba(168, 174, 4, 0.41)" },
          duration: 1000,
        });
        return false;
      }
      toast.show("Error adding word. Please try again.", {
        containerStyle: { backgroundColor: "rgba(228, 5, 5, 0.5)" },
        duration: 1000,
      });
      return false;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        keyboardShouldPersistTaps="handled"
      >
        <Dashboard
          open={open}
          setOpen={setOpen}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          verbType={verbType}
          setVerbType={setVerbType}
          page={page}
          setPage={setPage}
        />

        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <WordsTable
            words={data?.results || []}
            page={page}
            totalPages={data?.totalPages || 1}
            setPage={setPage}
            mode="all"
            onAdd={handleAddWord}
          />
        )}
      </ScrollView>
    </View>
  );
}
