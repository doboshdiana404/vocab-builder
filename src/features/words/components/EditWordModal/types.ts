import { Word } from "@/src/types";

export type EditWordModalProps = {
  visible: boolean;
  onClose: () => void;
  word: Word;
};

export type FormErrors = {
  ua?: string;
  en?: string;
};