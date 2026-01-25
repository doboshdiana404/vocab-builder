import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ArrowHorizontal from "@/assets/icons/arrow-horizontal.svg";
import ProgressBar from "@/src/components/ui/ProgressBar/ProgressBar";
import {
  useGetTrainingTasksQuery,
  useSendTrainingAnswersMutation,
} from "@/src/features/training/api/trainingApi";

import TrainingEmptyState from "@/src/features/training/components/TrainingEmptyState/TrainingEmptyState";
import { useTraining } from "@/src/features/training/hooks/useTraining";
import { getTrainingView } from "../utils";
import { trainingStyles as styles } from "./Training.styles";

export default function TrainingScreen() {
  const router = useRouter();

  const { isLoading, refetch } = useGetTrainingTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [sendAnswers, { isLoading: isSending }] =
    useSendTrainingAnswersMutation();

  const onFinish = (results: { correct: string[]; mistakes: string[] }) => {
    router.replace({
      pathname: "/training/well-done",
      params: { results: JSON.stringify(results), hasTasks: "1" },
    });
  };

  const {
    screenState,
    tasks,
    currentIndex,
    currentWord,
    isLastTask,
    shownWord,
    placeholder,
    userAnswer,
    setUserAnswer,
    canSubmit,
    handleSave,
    goNext,
    startSession,
  } = useTraining({
    isSending,
    sendAnswers,
    onFinish,
  });

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        const res: any = await refetch();
        const newTasks = res?.data?.tasks;
        if (!alive) return;
        if (Array.isArray(newTasks)) startSession(newTasks);
      })();

      return () => {
        alive = false;
      };
    }, [refetch, startSession]),
  );

  if (isLoading && tasks.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (screenState === "empty") return <TrainingEmptyState />;

  if (screenState !== "ready" || !currentWord) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <TrainingEmptyState />
      </View>
    );
  }

  const view = getTrainingView(currentWord.task);
  const { ShownFlag, AnswerFlag } = view;

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
            onSubmitEditing={handleSave}
          />

          <View style={styles.langRow}>
            {!isLastTask && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={goNext}
                disabled={isSending}
                style={styles.nextWrap}
              >
                <Text style={styles.next}>Next</Text>
                <ArrowHorizontal width={20} height={20} stroke="#85AA9F" />
              </TouchableOpacity>
            )}

            <View style={styles.lang}>
              <AnswerFlag width={28} height={28} />
              <Text style={styles.langText}>{view.answerLang}</Text>
            </View>
          </View>
        </View>

        <View style={styles.wordBlock}>
          <View style={styles.cardWrap}>
            <Text style={styles.word}>{shownWord}</Text>

            <View style={styles.langLower}>
              <ShownFlag width={28} height={28} />
              <Text style={styles.langText}>{view.shownLang}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, !canSubmit && styles.saveBtnDisabled]}
        disabled={!canSubmit}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          {isSending ? "Saving…" : isLastTask ? "Finish" : "Save"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
