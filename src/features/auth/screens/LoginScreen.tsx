import { authStyles as styles } from "@/src/features/auth/screens/Auth.styles";
import React, { useState } from "react";

import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useLoginMutation } from "../api/authApi";
import AuthScreenLayout from "../components/AuthScreenLayout";

function getErrorMessage(err: any): string {
  const status = err?.status;

  if (status === "FETCH_ERROR") {
    return "No internet connection.";
  }

  if (status === "TIMEOUT_ERROR") {
    return "Request timed out. Try again.";
  }

  if (status === 401) {
    return "Invalid email or password.";
  }

  if (status === 400) {
    return "Please check your input data.";
  }

  return err?.data?.message || "Login failed. Try again later.";
}

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (isLoading) return;
    try {
      await login({ email, password }).unwrap();
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      Alert.alert("Login failed", errorMessage);
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

      <TouchableOpacity
        style={[styles.button, !canSubmit && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={!canSubmit}
      >
        {isLoading && <ActivityIndicator color="#fff" />}
        {!isLoading && <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </AuthScreenLayout>
  );
}
