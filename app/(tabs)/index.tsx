import Dashboard from "@/src/components/Dashboard/Dashboard";
import EditWordModal from "@/src/components/EditWordModal/EditWordModal";
import WordsTable from "@/src/components/WordsTable/WordsTable";
import { useGetWordsQuery } from "@/src/store/api";
import { RootState } from "@/src/store/store";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { Word } from "../../src/components/WordsTable/types";

export default function HomeScreen() {
  const { token, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [wordToEdit, setWordToEdit] = useState<Word | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [verbType, setVerbType] = useState<string | null>(null);
  const { data, isLoading, refetch } = useGetWordsQuery(
    {
      ...(search ? { keyword: search } : {}),
      ...(category ? { category } : {}),
      ...(verbType ? { isIrregular: verbType === "irregular" } : {}),
      page,
      limit: 7,
    },
    { skip: !isInitialized || !token }
  );
  const handleEdit = (word: Word) => {
    setWordToEdit(word);
    setEditModalVisible(true);
  };

  if (!isInitialized || !token || isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8", position: "relative" }}>
      <WordsTable
        words={data?.results ?? []}
        onEdit={handleEdit}
        onRefresh={refetch}
        page={page}
        totalPages={data?.totalPages ?? 1}
        setPage={setPage}
        mode="own"
        ListHeaderComponent={
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
        }
      />

      {wordToEdit && (
        <EditWordModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          word={wordToEdit}
        />
      )}
    </View>
  );
}
