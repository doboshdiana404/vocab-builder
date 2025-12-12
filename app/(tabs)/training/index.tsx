import ArrowHorizontal from "@/assets/icons/arrow-horizontal.svg";
import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";
import ProgressBar from "@/src/components/ui/ProgressBar/ProgressBar";
import {
  useGetTrainingTasksQuery,
  useSendTrainingAnswersMutation,
} from "@/src/store/api/training/trainingApi";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { trainingStyles as styles } from "./Training.styles";

export default function TrainingScreen() {
  const { data, isLoading } = useGetTrainingTasksQuery();
  const [sendAnswers, { isLoading: isSending }] =
    useSendTrainingAnswersMutation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  if (isLoading) return <Text>Loading...</Text>;
  if (!data?.tasks?.length) return <Text>No words for training</Text>;

  const tasks = data.tasks;
  const currentWord = tasks[currentIndex];

  const isUaToEn = currentWord.task === "en";
  const shownWord = isUaToEn ? currentWord.ua : currentWord.en;

  const shownFlag = isUaToEn ? (
    <Ukraine width={28} height={28} />
  ) : (
    <UnitedKingdom width={28} height={28} />
  );
  const shownLang = isUaToEn ? "Ukrainian" : "English";

  const answerFlag = isUaToEn ? (
    <UnitedKingdom width={28} height={28} />
  ) : (
    <Ukraine width={28} height={28} />
  );
  const answerLang = isUaToEn ? "English" : "Ukrainian";

  const placeholder = isUaToEn ? "Enter translation" : "Введіть переклад";

  const goNext = () => {
    if (isSending) return;

    setUserAnswer("");

    if (currentIndex + 1 < tasks.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSave = async () => {
    if (!userAnswer.trim() || isSending) return;

    Keyboard.dismiss();

    const answerItem: any = {
      _id: currentWord._id,
      task: currentWord.task,
    };
    if (currentWord.task === "en") {
      answerItem.en = userAnswer;
      answerItem.ua = currentWord.ua;
    } else {
      answerItem.ua = userAnswer;
      answerItem.en = currentWord.en;
    }

    try {
      await sendAnswers([answerItem]).unwrap();
      setUserAnswer("");

      if (currentIndex + 1 < tasks.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    } catch (e) {
      Alert.alert("Error", "Failed to save answer. Try again.");
    }
  };

  if (isFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.finishText}>Training complete!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progress}>
        <ProgressBar
          progress={((currentIndex + 1) / tasks.length) * 100}
          size={44}
          showCenterLabel
          centerLabel={`${currentIndex + 1}`}
          color="rgb(133, 170, 159)"
          backgroundColor="rgb(255,255,255)"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardWrap}>
          <TextInput
            style={styles.headerInput}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder={placeholder}
            placeholderTextColor="#121417"
            returnKeyType="done"
            onSubmitEditing={goNext}
          />

          <View style={styles.langRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={goNext}
              disabled={isSending}
              style={styles.nextWrap}
            >
              <Text style={styles.next}>Next</Text>
              <ArrowHorizontal width={20} height={20} />
            </TouchableOpacity>

            <View style={styles.lang}>
              {answerFlag}
              <Text style={styles.langText}>{answerLang}</Text>
            </View>
          </View>
        </View>

        <View style={styles.wordBlock}>
          <View style={styles.cardWrap}>
            <Text style={styles.word}>{shownWord}</Text>

            <View style={styles.langLower}>
              {shownFlag}
              <Text style={styles.langText}>{shownLang}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.saveBtn,
          (!userAnswer.trim() || isSending) && styles.saveBtnDisabled,
        ]}
        disabled={!userAnswer.trim() || isSending}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>{isSending ? "Saving…" : "Save"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Cancel pressed");
        }}
      >
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
