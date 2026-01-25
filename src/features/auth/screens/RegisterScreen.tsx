import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { authStyles as styles } from "@/src/features/auth/screens/Auth.styles";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRegisterMutation } from "../api/authApi";
import AuthScreenLayout from "../components/AuthScreenLayout";

function getErrorMessage(err: any): string {
  const status = err?.status;

  if (status === 409) return "User with this email already exists.";
  if (status === 400) return "Please check your input data.";
  if (status === 401 || status === 403)
    return "Authorization error. Try again.";
  if (status === "FETCH_ERROR") return "No internet connection.";
  if (status === "TIMEOUT_ERROR") return "Request timed out. Try again.";

  return (
    err?.data?.message || err?.error || "Registration failed. Try again later."
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await register({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      }).unwrap();
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      Alert.alert("Registration failed", errorMessage);
    }
  };

  return (
    <AuthScreenLayout
      title="Register"
      description="To start using our services, please fill out the registration form below. All fields are mandatory:"
    >
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
        {isLoading && <ActivityIndicator color="#fff" />}
        <Text style={styles.buttonText}>
          {isLoading ? "Registering…" : "Register"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.register}>Login</Text>
      </TouchableOpacity>
    </AuthScreenLayout>
  );
}
