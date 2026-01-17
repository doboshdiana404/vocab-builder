import { Word, WordWithProgress } from "@/src/types";

export interface GetWordsParams {
  keyword?: string;
  category?: string | null;
  isIrregular?: boolean | null;
  page: number;
  limit: number;
}

export interface GetWordsResponse {
  results: WordWithProgress[];
  totalPages: number;
  totalCount?: number;
}

export interface GetAllWordsResponse {
  results: Word[];
  totalPages: number;
  totalCount?: number;
}

export interface AddWordRequest {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export interface UpdateWordRequest {
  ua: string;
  en: string;
  category: string;
  isIrregular?: boolean;
}

export interface UpdateWordParams {
  id: string;
  body: UpdateWordRequest;
}