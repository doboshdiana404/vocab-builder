import { useRouter } from "expo-router";
import React, { useState } from "react";
import { authStyles as styles } from "../../src/styles/Auth.styles";

import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { useLoginMutation } from "@/src/store/api";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    if (isLoading) return;
    try {
      await login({ email, password }).unwrap();
      router.replace("/(tabs)");
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && !isLoading;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/authillustraton.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>
            Word • Translation • Grammar • Progress
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -10 : -20}
          style={styles.keyboardContainer}
        >
          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Login</Text>
            <Text style={styles.description}>
              Please enter your login details to continue using our service:
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#121417"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <PasswordInput value={password} onChangeText={setPassword} />

            <View style={{ minHeight: 18, marginTop: 8 }}>
              {!!error && (
                <Text style={{ color: "red" }}>Invalid email or password</Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                !canSubmit && { opacity: 0.6 },
                { flexDirection: "row", justifyContent: "center", gap: 10 },
              ]}
              onPress={handleLogin}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              {isLoading ? <ActivityIndicator color="#fff" /> : null}
              <Text style={styles.buttonText}>
                {isLoading ? "Logging in…" : "Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
