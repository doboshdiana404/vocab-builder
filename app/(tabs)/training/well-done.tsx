import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { wellDoneStyles as styles } from "./WellDone.styles";
import { TrainingResult } from "./training.types";

export default function WellDoneScreen() {
  const { results } = useLocalSearchParams();

  let parsed: TrainingResult = { correct: [], mistakes: [] };
  try {
    parsed = results ? JSON.parse(results as string) : parsed;
  } catch {
    parsed = { correct: [], mistakes: [] };
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("@/assets/images/openBook.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Well done</Text>

      <View style={styles.columns}>
        <View style={styles.col}>
          <Text style={styles.columnTitle}>Correct answers:</Text>
          {parsed.correct.map((item, i) => (
            <Text key={i} style={styles.resultItem}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.col}>
          <Text style={styles.columnTitle}>Mistakes:</Text>
          {parsed.mistakes.map((item, i) => (
            <Text key={i} style={styles.resultItem}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
