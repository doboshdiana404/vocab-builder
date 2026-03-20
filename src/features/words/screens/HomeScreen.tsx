import Dashboard from "@/src/features/words/components/Dashboard/Dashboard";
import EditWordModal from "@/src/features/words/components/EditWordModal/EditWordModal";
import WordsTable from "@/src/features/words/components/WordsTable/WordsTable";
import { RootState } from "@/src/store/store";
import { Word } from "@/src/types";
import { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { useGetWordsQuery } from "../api/wordsApi";
interface HomeScreenProps {
  onAddWord: () => void;
}
export default function HomeScreen({ onAddWord }: HomeScreenProps) {
  const { token, isInitialized } = useSelector(
    (state: RootState) => state.auth,
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
    { skip: !isInitialized || !token },
  );

  const dashboardHeader = useMemo(
    () => (
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
        onAddWord={onAddWord}
      />
    ),
    [open, search, category, verbType, page, onAddWord],
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
        ListHeaderComponent={dashboardHeader}
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
