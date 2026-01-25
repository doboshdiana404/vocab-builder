import { authStyles as styles } from "@/src/features/auth/screens/Auth.styles";
import React, { useState } from "react";

import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoginMutation } from "../api/authApi";
import AuthScreenLayout from "../components/AuthScreenLayout";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    if (isLoading) return;
    try {
      await login({ email, password }).unwrap();
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const canSubmit = email.trim() && password.trim() && !isLoading;

  return (
    <AuthScreenLayout
      title="Login"
      description="Please enter your login details to continue using our service:"
      showSubtitle
    >
      <TextInput
        style={[styles.input, emailFocused && { borderColor: "#85aa9f" }]}
        placeholder="Email"
        placeholderTextColor="#121417"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />

      <PasswordInput value={password} onChangeText={setPassword} />

      {error && (
        <View style={{ minHeight: 18, marginTop: 8 }}>
          <Text style={{ color: "red" }}>Invalid email or password</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !canSubmit && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={!canSubmit}
      >
        {isLoading && <ActivityIndicator color="#fff" />}
        <Text style={styles.buttonText}>
          {isLoading ? "Logging in…" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </AuthScreenLayout>
  );
}
