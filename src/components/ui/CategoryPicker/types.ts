export type ItemType = {
  label: string;
  value: string;
};

export type CategoryPickerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: any;
  setValue: (value: any) => void;
  items: ItemType[];
};
