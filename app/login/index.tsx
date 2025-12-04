import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { authStyles as styles } from "../../src/styles/authStyles";

import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { useLoginMutation } from "@/src/store/api";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      router.replace("/(tabs)");
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(tabs)");
    }
  }, [isSuccess]);

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
            />
            <PasswordInput value={password} onChangeText={setPassword} />

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
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
