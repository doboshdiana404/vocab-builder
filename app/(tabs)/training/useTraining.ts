import { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import type { Params, Task, TrainingResult } from "./training.types";
import { formatResultLabel } from "./training.utils";

export function useTraining({ isSending, sendAnswers, onFinish }: Params) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const [results, setResults] = useState<TrainingResult>({
    correct: [],
    mistakes: [],
  });

  const startSession = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    setCurrentIndex(0);
    setUserAnswer("");
    setResults({ correct: [], mistakes: [] });
  }, []);

  useEffect(() => {
    if (tasks.length > 0 && currentIndex >= tasks.length) {
      setCurrentIndex(tasks.length - 1);
    }
  }, [tasks.length, currentIndex]);

  const currentWord = tasks[currentIndex] ?? null;
  const isLastTask = tasks.length > 0 && currentIndex === tasks.length - 1;

  const isUaToEn = currentWord?.task === "en";
  const shownWord = currentWord
    ? isUaToEn
      ? currentWord.ua ?? ""
      : currentWord.en ?? ""
    : "";

  const placeholder = isUaToEn ? "Enter translation" : "Введіть переклад";

  const canSubmit = !!userAnswer.trim() && !isSending;

  const moveNextOrFinish = useCallback(
    (nextResults: TrainingResult) => {
      if (isLastTask) onFinish(nextResults);
      else setCurrentIndex((p) => p + 1);
    },
    [isLastTask, onFinish]
  );

  const handleSave = useCallback(async () => {
    const answer = userAnswer.trim();
    if (!answer || isSending || !currentWord) return;

    Keyboard.dismiss();

    const ua = isUaToEn ? currentWord.ua ?? "" : answer;
    const en = isUaToEn ? answer : currentWord.en ?? "";

    if (!ua || !en) {
      Alert.alert("Error", "Task data incomplete (missing ua/en).");
      return;
    }

    try {
      const res = await sendAnswers([
        { _id: currentWord._id, task: currentWord.task, ua, en },
      ]).unwrap();

      const item = res?.[0];
      if (!item || typeof item.isDone !== "boolean") {
        Alert.alert("Error", "Unexpected server response.");
        return;
      }

      const label = formatResultLabel(item);

      const nextResults: TrainingResult = item.isDone
        ? { correct: [...results.correct, label], mistakes: results.mistakes }
        : { correct: results.correct, mistakes: [...results.mistakes, label] };

      setResults(nextResults);
      setUserAnswer("");
      moveNextOrFinish(nextResults);
    } catch {
      Alert.alert("Error", "Failed to save answer.");
    }
  }, [
    userAnswer,
    isSending,
    currentWord,
    isUaToEn,
    sendAnswers,
    results,
    moveNextOrFinish,
  ]);

  const goNext = useCallback(async () => {
    if (isSending || !currentWord) return;

    Keyboard.dismiss();

    const ua = isUaToEn ? currentWord.ua ?? "" : "";
    const en = isUaToEn ? "" : currentWord.en ?? "";

    if (!ua && !en) {
      const nextResults: TrainingResult = {
        correct: results.correct,
        mistakes: [...results.mistakes, shownWord || "(empty task)"],
      };
      setResults(nextResults);
      setUserAnswer("");
      moveNextOrFinish(nextResults);
      return;
    }

    try {
      const res = await sendAnswers([
        { _id: currentWord._id, task: currentWord.task, ua, en },
      ]).unwrap();

      const item = res?.[0];

      const label =
        item && item.ua && item.en ? formatResultLabel(item) : shownWord;

      const nextResults: TrainingResult = {
        correct: results.correct,
        mistakes: [...results.mistakes, label],
      };

      setResults(nextResults);
      setUserAnswer("");
      moveNextOrFinish(nextResults);
    } catch {
      const nextResults: TrainingResult = {
        correct: results.correct,
        mistakes: [...results.mistakes, shownWord || "(skipped)"],
      };
      setResults(nextResults);
      setUserAnswer("");
      moveNextOrFinish(nextResults);
    }
  }, [
    isSending,
    currentWord,
    isUaToEn,
    sendAnswers,
    results,
    shownWord,
    moveNextOrFinish,
  ]);

  const screenState =
    tasks.length === 0 ? "empty" : !currentWord ? "no-current" : "ready";

  return {
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
  } as const;
}
