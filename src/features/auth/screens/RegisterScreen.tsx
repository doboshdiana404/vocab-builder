import AppLogo from "@/src/components/layout/AppLogo/AppLogo";
import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { authStyles as styles } from "@/src/features/auth/screens/Auth.styles";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { useRegisterMutation } from "../api/authApi";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const [emailFocused, setEmailFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const getRegisterErrorMessage = (err: any) => {
    const status = err?.status;

    if (status === 409) return "User with this email already exists.";
    if (status === 400) return "Please check your input data.";
    if (status === 401 || status === 403)
      return "Authorization error. Try again.";
    if (status === "FETCH_ERROR") return "No internet connection.";
    if (status === "TIMEOUT_ERROR") return "Request timed out. Try again.";

    return (
      err?.data?.message ||
      err?.error ||
      "Registration failed. Try again later."
    );
  };

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      !isLoading
    );
  }, [name, email, password, isLoading]);

  const handleRegister = async () => {
    if (isLoading) return;

    const n = name.trim();
    const e = email.trim();
    const p = password.trim();

    if (!n || !e || !p) {
      Alert.alert("Please fill in all fields");
      return;
    }

    try {
      await register({ name: n, email: e, password: p }).unwrap();
    } catch (err: any) {
      Alert.alert("Registration failed", getRegisterErrorMessage(err));
    }
  };

  useEffect(() => {
    if (isSuccess) router.replace("/(tabs)");
  }, [isSuccess, router]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        {Platform.OS === "android" && (
          <View style={styles.logoWrap}>
            <AppLogo />
          </View>
        )}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/authillustraton.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -10 : -20}
          style={styles.keyboardContainer}
        >
          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Register</Text>
            <Text style={styles.description}>
              To start using our services, please fill out the registration form
              below. All fields are mandatory:
            </Text>

            <TextInput
              style={[styles.input, nameFocused && { borderColor: "#85aa9f" }]}
              placeholder="Name"
              placeholderTextColor="#121417"
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              textContentType="name"
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
            />

            <TextInput
              style={[styles.input, emailFocused && { borderColor: "#85aa9f" }]}
              placeholder="Email"
              placeholderTextColor="#121417"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />

            <PasswordInput value={password} onChangeText={setPassword} />

            <TouchableOpacity
              style={[
                styles.button,
                !canSubmit && { opacity: 0.6 },
                { flexDirection: "row", justifyContent: "center", gap: 10 },
              ]}
              onPress={handleRegister}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              {isLoading ? <ActivityIndicator color="#fff" /> : null}
              <Text style={styles.buttonText}>
                {isLoading ? "Registering…" : "Register"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.register}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
