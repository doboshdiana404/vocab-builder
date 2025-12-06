export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  progress: number;
}

export interface WordsTableProps {
  words: Word[];
  onEdit?: (word: Word) => void;
  onRefresh?: () => void;
  onAdd?: (word: Word) => Promise<boolean> | boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  mode?: "own" | "all";
}
