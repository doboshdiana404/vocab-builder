import type { ComponentType } from "react";
import type { AnswerResponseItem } from "./training.types";

import Ukraine from "@/assets/icons/ukraine.svg";
import UnitedKingdom from "@/assets/icons/united-kingdom.svg";

type SvgIcon = ComponentType<{ width?: number; height?: number }>;

export const formatResultLabel = (item: AnswerResponseItem) =>
  item.task === "en" ? item.ua : item.en;

export const getTrainingView = (task: "en" | "ua") => {
  const isUaToEn = task === "en";

  const ShownFlag: SvgIcon = isUaToEn ? Ukraine : UnitedKingdom;
  const AnswerFlag: SvgIcon = isUaToEn ? UnitedKingdom : Ukraine;

  return {
    isUaToEn,
    ShownFlag,
    AnswerFlag,
    shownLang: isUaToEn ? "Ukrainian" : "English",
    answerLang: isUaToEn ? "English" : "Ukrainian",
  };
};
