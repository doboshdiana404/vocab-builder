import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { EmptyProps } from "../../types";
import { trainingEmptyStyles as styles } from "./TrainingEmptyState.styles";

export default function TrainingEmptyState({
  onAddWord,
  onCancel,
}: EmptyProps) {
  const router = useRouter();

  const handleAdd = () => onAddWord?.() ?? router.push("/add-word");
  const handleCancel = () => onCancel?.() ?? router.back();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={require("@/assets/images/blood-report.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>
        You don&#39;t have a single word to learn right now.{" "}
      </Text>
      <Text style={styles.text}>
        Please create or add a word to start the workout.{"\n"}
        We want to improve your vocabulary and develop your knowledge, so please
        share the words you are interested in adding to your study.
      </Text>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryText}>Add word</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
