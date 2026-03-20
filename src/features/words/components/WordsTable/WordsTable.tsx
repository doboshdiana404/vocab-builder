import React, { useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { wordsTableStyles as styles } from "./WordsTable.styles";

import WordActionsModal from "./WordActionsModal";
import WordRow from "./WordRow";
import WordsHeader from "./WordsHeader";
import useColumnWidths from "./useColumnWidths";

import type { Word } from "@/src/types";
import { useDeleteWordMutation } from "../../api/wordsApi";
import WordsPagination from "../WordsPagination/WordsPagination";
import type { Props } from "./types";

export default function WordsTable({
  words,
  loading,
  onEdit,
  onRefresh,
  page,
  totalPages,
  setPage,
  mode,
  onAdd,
  ListHeaderComponent,
}: Props) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [deleteWord] = useDeleteWordMutation();
  const { colWord, colTranslation, colProgress, colActions } =
    useColumnWidths();
  const header = useMemo(
    () => (
      <View style={{ position: "relative" }}>
        <View style={{ position: "relative" }}>
          {ListHeaderComponent ?? null}
        </View>
        <View style={{ position: "relative" }}>
          <WordsHeader
            colWord={colWord}
            colTranslation={colTranslation}
            colProgress={colProgress}
            colActions={colActions}
            mode={mode}
          />
        </View>
      </View>
    ),
    [
      ListHeaderComponent,
      colWord,
      colTranslation,
      colProgress,
      colActions,
      mode,
    ],
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh?.();
    setRefreshing(false);
  };
  const handleDelete = async () => {
    if (!selectedWord) return;

    try {
      await deleteWord(selectedWord._id).unwrap();
      Alert.alert("Word deleted");
      setModalVisible(false);
      onRefresh?.();
    } catch {
      Alert.alert("Failed to delete word");
    }
  };

  const handleEllipsisPress = (
    pos: { top: number; left: number },
    word: Word,
  ) => {
    setModalPos(pos);
    setSelectedWord(word);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={words}
        keyExtractor={(item) => item._id}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <WordRow
            item={item}
            colWord={colWord}
            colTranslation={colTranslation}
            colProgress={colProgress}
            colActions={colActions}
            onEllipsisPress={handleEllipsisPress}
            mode={mode}
            onAdd={onAdd}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={header}
        ListFooterComponent={() => (
          <View>
            <WordsPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </View>
        )}
      />

      {mode === "own" && (
        <WordActionsModal
          isVisible={isModalVisible}
          position={modalPos}
          onClose={() => setModalVisible(false)}
          onEdit={() => selectedWord && onEdit?.(selectedWord)}
          onDelete={handleDelete}
        />
      )}
    </View>
  );
}
