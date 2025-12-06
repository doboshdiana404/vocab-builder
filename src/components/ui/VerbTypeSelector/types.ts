import { Dispatch, SetStateAction } from "react";

export type VerbTypeSelectorProps = {
  verbType: string | null;
  setVerbType: Dispatch<SetStateAction<string | null>>;
};
