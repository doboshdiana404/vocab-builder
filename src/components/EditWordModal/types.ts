type Word = {
  _id: string;
  ua: string;
  en: string;
  category: string;
  isIrregular?: boolean;
};

export type EditWordModalProps = {
  visible: boolean;
  onClose: () => void;
  word: Word;
};

export type FormErrors = {
  ua?: string;
  en?: string;
};
