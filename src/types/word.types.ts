export interface Word {
    _id: string;
    en: string;
    ua: string;
    category: string;
    progress?: number;
    isIrregular?: boolean;
  }
  
  export type WordWithProgress = Word & { progress: number };