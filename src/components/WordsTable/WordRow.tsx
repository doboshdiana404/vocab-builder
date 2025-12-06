import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "../ui/ProgressBar";
import { wordsTableStyles as styles } from "./WordsTable.styles";
import type { Word } from "./types";

interface Props {
  item: Word;
  colWord: number;
  colTranslation: number;
  colProgress: number;
  colActions: number;
  onEllipsisPress: (pos: { top: number; left: number }, word: Word) => void;
}

export default function WordRow({
  item,
  colWord,
  colTranslation,
  colProgress,
  colActions,
  onEllipsisPress,
}: Props) {
  const btnRef = useRef<View>(null);
  const [added, setAdded] = useState(false);

  const measurePosition = () => {
    if (!btnRef.current) return;
    btnRef.current.measure((x, y, width, height, pageX, pageY) => {
      onEllipsisPress({ top: pageY + height + 4, left: pageX - 120 }, item);
    });
  };

  return (
    <View style={styles.row}>
      <Text style={[styles.cellText, styles.cell, { width: colWord }]}>
        {item.en}
      </Text>

      <Text style={[styles.cellText, styles.cell, { width: colTranslation }]}>
        {item.ua}
      </Text>

      <View style={[styles.cell, { width: colProgress, alignItems: "center" }]}>
        <ProgressBar progress={item.progress} size={24} />{" "}
      </View>

      <View style={[styles.cell, styles.lastCell, { width: colActions }]}>
        <TouchableOpacity ref={btnRef} onPress={measurePosition}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
