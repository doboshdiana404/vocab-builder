export type Task = {
  _id: string;
  ua?: string;
  en?: string;
  task: "en" | "ua";
};

export type TrainingResult = {
  correct: string[];
  mistakes: string[];
};

export type AnswerResponseItem = {
  _id: string;
  task: "en" | "ua";
  ua: string;
  en: string;
  isDone: boolean;
};
export type SendAnswers = (
  payload: { _id: string; task: "en" | "ua"; ua: string; en: string }[]
) => { unwrap: () => Promise<AnswerResponseItem[]> };

export type Params = {
  isSending: boolean;
  sendAnswers: SendAnswers;
  onFinish: (results: TrainingResult) => void;
};
