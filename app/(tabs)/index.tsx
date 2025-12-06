import Dashboard from "@/src/components/Dashboard/Dashboard";
import WordsTable from "@/src/components/WordsTable/WordsTable";
import { useGetWordsQuery } from "@/src/store/api";
import { RootState } from "@/src/store/store";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const token = useSelector((state: RootState) => state.auth.token);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [verbType, setVerbType] = useState<string | null>(null);
  const { data, isLoading, refetch } = useGetWordsQuery(
    {
      ...(search ? { keyword: search } : {}),
      ...(category ? { category } : {}),
      ...(verbType ? { isIrregular: verbType === "irregular" } : {}),
    },
    { skip: !token }
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb", position: "relative" }}>
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
        />
        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <WordsTable
            words={data?.results ?? []}
            onEdit={console.log("modal edit")}
            onRefresh={refetch}
            page={page}
            totalPages={data?.totalPages ?? 1}
            setPage={setPage}
          />
        )}
      </ScrollView>
    </View>
  );
}
