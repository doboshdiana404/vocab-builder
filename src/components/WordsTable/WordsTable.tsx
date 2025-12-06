import React, { useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { wordsTableStyles as styles } from "./WordsTable.styles";

import useColumnWidths from "./useColumnWidths";
import WordRow from "./WordRow";
import WordsHeader from "./WordsHeader";

import { useDeleteWordMutation } from "@/src/store/api";
import type { Word, WordsTableProps } from "./types";
import WordActionsModal from "./WordActionsModal";

export default function WordsTable({
  words,
  onEdit,
  onRefresh,
}: WordsTableProps) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  const [deleteWord] = useDeleteWordMutation();
  const { colWord, colTranslation, colProgress, colActions } =
    useColumnWidths();

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
    word: Word
  ) => {
    setModalPos(pos);
    setSelectedWord(word);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <WordsHeader
        colWord={colWord}
        colTranslation={colTranslation}
        colProgress={colProgress}
        colActions={colActions}
      />

      <FlatList
        data={words}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <WordRow
            item={item}
            colWord={colWord}
            colTranslation={colTranslation}
            colProgress={colProgress}
            colActions={colActions}
            onEllipsisPress={handleEllipsisPress}
          />
        )}
      />
      <WordActionsModal
        isVisible={isModalVisible}
        position={modalPos}
        onClose={() => setModalVisible(false)}
        onEdit={() => selectedWord && onEdit?.(selectedWord)}
        onDelete={handleDelete}
      />
    </View>
  );
}
