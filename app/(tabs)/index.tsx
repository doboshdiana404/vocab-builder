import Dashboard from "@/src/components/Dashboard/Dashboard";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [verbType, setVerbType] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb", position: "relative" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        keyboardShouldPersistTaps="handled"
      >
        <Dashboard
          open={open}
          setOpen={setOpen}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          verbType={verbType}
          setVerbType={setVerbType}
        />
      </ScrollView>
    </View>
  );
}
