import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./VerbTypeSelector.styles";
import { VerbTypeSelectorProps } from "./types";

export default function VerbTypeSelector({
  verbType,
  setVerbType,
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
                  verbType === type.toLowerCase() ? "#85aa9f" : "#ccc",
              },
            ]}
          >
            {verbType === type.toLowerCase() && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={styles.verbTypeText}>{type}</Text>
        </TouchableOpacity>
      ))}{" "}
    </View>
  );
}
