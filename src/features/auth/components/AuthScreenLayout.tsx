import AppLogo from "@/src/components/layout/AppLogo/AppLogo";
import { authStyles as styles } from "@/src/features/auth/screens/Auth.styles";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface AuthScreenLayoutProps {
  title: string;
  description: string;
  showSubtitle?: boolean;
  children: React.ReactNode;
}

export default function AuthScreenLayout({
  title,
  description,
  showSubtitle = false,
  children,
}: AuthScreenLayoutProps) {
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
          {showSubtitle && (
            <Text style={styles.subtitle}>
              Word • Translation • Grammar • Progress
            </Text>
          )}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -10 : -20}
          style={styles.keyboardContainer}
        >
          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {children}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
