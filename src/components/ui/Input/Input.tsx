import { inputStyles as styles } from "./Input.styles";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
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
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? "#FF6B6B"
    : focused
    ? "#85aa9f"
    : "rgba(18, 20, 23, 0.1)";

  return (
    <View style={containerStyle}>
      <View style={styles.labelRow}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#121417"
        onFocus={stable ? undefined : () => setFocused(true)}
        onBlur={stable ? undefined : () => setFocused(false)}
        style={[
          styles.input,
          { borderColor: stable ? "rgba(18, 20, 23, 0.1)" : borderColor },
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
