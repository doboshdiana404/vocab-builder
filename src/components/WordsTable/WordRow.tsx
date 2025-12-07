import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "../ui/ProgressBar/ProgressBar";
import { wordsTableStyles as styles } from "./WordsTable.styles";
import type { WordRowProps } from "./types";

export default function WordRow({
  item,
  colWord,
  colTranslation,
  colProgress,
  colActions,
  onEllipsisPress,
  onAdd,
  mode,
}: WordRowProps) {
  const btnRef = useRef<View>(null);
  const [added, setAdded] = useState(false);

  const measurePosition = () => {
    if (!btnRef.current) return;
    btnRef.current.measure((x, y, width, height, pageX, pageY) => {
      onEllipsisPress({ top: pageY + height + 4, left: pageX - 120 }, item);
    });
  };
  const handleAdd = async () => {
    const result = await onAdd?.(item);
    if (result) setAdded(true);
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
        {mode === "own" ? (
          <ProgressBar progress={item.progress} size={24} />
        ) : (
          <Text style={styles.categoryText}>{item.category}</Text>
        )}{" "}
      </View>

      <View style={[styles.cell, styles.lastCell, { width: colActions }]}>
        {mode === "own" ? (
          <TouchableOpacity ref={btnRef} onPress={measurePosition}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#6b7280" />
          </TouchableOpacity>
        ) : added ? (
          <Ionicons name="checkmark-circle" size={20} color="green" />
        ) : (
          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="arrow-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
