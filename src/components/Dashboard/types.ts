export interface Category {
  name: string;
}

export interface DashboardProps {
  search: string;
  setSearch: (v: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: string | null;
  setCategory: (v: string | null) => void;
  verbType: string | null;
  setVerbType: React.Dispatch<React.SetStateAction<string | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
