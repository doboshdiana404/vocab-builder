import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { inputStyles as styles } from "./Input.styles";
import { InputProps } from "./types";

export default function Input({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  error,
  containerStyle,
  stable = false,
  changeColor = "#121417",
  borderChangeColor = "rgba(18, 20, 23, 0.1)",
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? "#FF6B6B"
    : focused
      ? "#85aa9f"
      : borderChangeColor;

  return (
    <View style={containerStyle}>
      <View style={styles.labelRow}>
        {icon}
        <Text style={[styles.label, { color: changeColor }]}>{label}</Text>
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={changeColor}
        onFocus={stable ? undefined : () => setFocused(true)}
        onBlur={stable ? undefined : () => setFocused(false)}
        style={[
          styles.input,
          { color: changeColor },
          { borderColor: stable ? borderChangeColor : borderColor },
        ]}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {error && (
        <View style={{ minHeight: 18 }}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
}
