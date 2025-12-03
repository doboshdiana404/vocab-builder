import { useRouter } from "expo-router";
import React, { useState } from "react";
import { authStyles as styles } from "../../src/styles/authStyles";

import { useLoginMutation, wordsApi } from "@/src/store/api";
import { setCredentials } from "@/src/store/api/auth/authSlice";
import {
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
import { useDispatch } from "react-redux";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      dispatch(wordsApi.util.invalidateTags(["Words"]));
      router.replace("/(tabs)");
    } catch (e) {
      console.error("Login failed", e);
    }
  };

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
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#121417"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          {error && (
            <Text style={{ color: "red" }}>Invalid email or password</Text>
          )}
          {isLoading && <Text>Loading...</Text>}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
