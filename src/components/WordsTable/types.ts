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
export interface WordsHeaderProps {
  colWord: number;
  colTranslation: number;
  colProgress: number;
  colActions: number;
}
export interface WordRowProps {
  item: Word;
  colWord: number;
  colTranslation: number;
  colProgress: number;
  colActions: number;
  mode?: "own" | "all";
  onEllipsisPress: (pos: { top: number; left: number }, word: Word) => void;
  onAdd?: (word: Word) => Promise<boolean> | boolean;
}
export interface WordActionsModalProps {
  isVisible: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
