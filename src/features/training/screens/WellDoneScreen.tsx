import Close from "@/assets/icons/close.svg";
import AndroidModal from "@/src/components/ui/AndroidModal/AndroidModal";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TrainingResult } from "../types";
import { wellDoneStyles as styles } from "./WellDone.styles";

export default function WellDoneScreen() {
  const { results } = useLocalSearchParams();
  const router = useRouter();
  const isAndroid = Platform.OS === "android";
  let parsed: TrainingResult = { correct: [], mistakes: [] };
  try {
    parsed = results ? JSON.parse(results as string) : parsed;
  } catch {
    parsed = { correct: [], mistakes: [] };
  }

  const content = (
    <>
      {!isAndroid && (
        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/openBook.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
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
          {isAndroid && (
            <View style={styles.imageWrapper}>
              <Image
                source={require("@/assets/images/openBook.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>
    </>
  );

  if (isAndroid) {
    return (
      <AndroidModal visible onClose={() => router.replace("/")}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.replace("/")}
        >
          <Close width={24} height={24} />
        </TouchableOpacity>

        <ScrollView
          style={styles.androidContent}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {content}
        </ScrollView>
      </AndroidModal>
    );
  }

  return <ScrollView style={styles.container}>{content}</ScrollView>;
}
