import EyeOff from "@/assets/icons/eye-off.svg";
import Eye from "@/assets/icons/eye.svg";

import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { authStyles as styles } from "../../../features/auth/screens/Auth.styles";
import { PasswordInputProps } from "./types";

export default function PasswordInput({
  value,
  onChangeText,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[styles.passwordContainer, focused && { borderColor: "#85aa9f" }]}
    >
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor="#121417"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOff width={20} height={20} />
        ) : (
          <Eye width={20} height={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}
