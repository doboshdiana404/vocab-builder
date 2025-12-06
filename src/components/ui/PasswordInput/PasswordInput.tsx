import EyeOff from "@/assets/icons/eye-off.svg";
import Eye from "@/assets/icons/eye.svg";

import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { authStyles as styles } from "../../../styles/Auth.styles";
import { PasswordInputProps } from "./types";

export default function PasswordInput({
  value,
  onChangeText,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor="#121417"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
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
