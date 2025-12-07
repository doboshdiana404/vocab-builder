export interface RootState {
  auth: {
    token: string | null;
  };
}

export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  progress?: number;
  isIrregular?: boolean;
}

export interface GetWordsResponse {
  results: Word[];
  totalPages: number;
  totalCount?: number;
}

export interface GetWordsParams {
  keyword?: string;
  category?: string | null;
  isIrregular?: boolean | null;
  page: number;
  limit: number;
}
