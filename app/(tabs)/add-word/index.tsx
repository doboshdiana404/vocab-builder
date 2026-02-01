import { AddWordForm } from "@/src/features/words/components/AddWordForm/AddWordForm";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddWordScreen() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "android") {
      router.replace("/(tabs)");
    }
  }, [router]);

  if (Platform.OS === "android") {
    return <View style={styles.safe} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AddWordForm
        onSuccess={() => router.replace("/(tabs)")}
        onCancel={() => router.back()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});
