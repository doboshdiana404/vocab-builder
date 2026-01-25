import Craftwork from "@/assets/icons/craftwork.svg";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./AppLogo.styles";

export default function AppLogo() {
  return (
    <View style={styles.container}>
      <Craftwork width={36} height={36} />
      <Text style={styles.title}>VocabBuilder</Text>
    </View>
  );
}
