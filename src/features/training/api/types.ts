import { AnswerResponseItem } from "@/src/features/training/types";

export interface GetTrainingTasksResponse {
  tasks: {
    _id: string;
    ua?: string;
    en?: string;
    task: "en" | "ua";
  }[];
}

export interface SendTrainingAnswersRequest {
  _id: string;
  task: "en" | "ua";
  ua: string;
  en?: string;
}

export type SendTrainingAnswersResponse = AnswerResponseItem[];
