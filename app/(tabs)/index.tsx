import Dashboard from "@/src/components/Dashboard/Dashboard";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb", position: "relative" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        keyboardShouldPersistTaps="handled"
      >
        <Dashboard search={search} setSearch={setSearch} />
      </ScrollView>
    </View>
  );
}
