import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./VerbTypeSelector.styles";
import { VerbTypeSelectorProps } from "./types";

export default function VerbTypeSelector({
  verbType,
  setVerbType,
  activeColor = "#85aa9f",
  unActiveColor = "#cacacb",
  typeColor = "#121417",
}: VerbTypeSelectorProps) {
  const options = ["Regular", "Irregular"];

  return (
    <View style={styles.optionsRow}>
      {options.map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => setVerbType(type.toLowerCase())}
          style={styles.option}
        >
          <View
            style={[
              styles.radioOuter,
              {
                borderColor:
                  verbType === type.toLowerCase() ? activeColor : unActiveColor,
              },
            ]}
          >
            {verbType === type.toLowerCase() && (
              <View
                style={[styles.radioInner, { backgroundColor: activeColor }]}
              />
            )}
          </View>
          <Text style={[styles.verbTypeText, { color: typeColor }]}>
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
