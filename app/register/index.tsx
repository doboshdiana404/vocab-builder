import PasswordInput from "@/src/components/ui/PasswordInput/PasswordInput";
import { useRegisterMutation } from "@/src/store/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
import { authStyles as styles } from "../../src/styles/Auth.styles";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      await register({ name, email, password }).unwrap();
    } catch (err: any) {
      Alert.alert(
        "Registration failed",
        err?.data?.message || "Try again later"
      );
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
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#121417"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#121417"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput value={password} onChangeText={setPassword} />

            {error && <Text style={{ color: "red" }}>Registration failed</Text>}
            {isLoading && <Text>Loading...</Text>}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
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
