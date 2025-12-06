import React from "react";
import { Text, View } from "react-native";
import { wordsTableStyles as styles } from "./WordsTable.styles";
import { WordsHeaderProps } from "./types";

export default function WordsHeader({
  colWord,
  colTranslation,
  colProgress,
  colActions,
}: WordsHeaderProps) {
  return (
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.cell, { width: colWord }]}>
        Word
      </Text>
      <Text style={[styles.headerText, styles.cell, { width: colTranslation }]}>
        Translation
      </Text>
      <Text style={[styles.headerText, styles.cell, { width: colProgress }]}>
        Progress
      </Text>
      <Text
        style={[styles.headerText, styles.lastCell, { width: colActions }]}
      />
    </View>
  );
}
