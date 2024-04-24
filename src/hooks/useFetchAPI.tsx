import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { APIService } from "../services/api";
import { Category } from "../services/api-types";
import { CreateCategoryDate, CreateTransactionDate } from "../validators/types";
import { formatDate } from "../utils/format-date";

interface FetchAPIProps {
  createCategory: (data: CreateCategoryDate) => Promise<void>;
  createTransaction: (data: CreateTransactionDate) => Promise<void>;
  fetchCategories: () => Promise<void>;
  categories: Category[];
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps);

type FetchAPIProviderProps = {
  children: ReactNode;
};

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const createTransaction = useCallback(async (data: CreateTransactionDate) => {
    await APIService.createTransaction({
      ...data,
      date: formatDate(data.date),
      amount: Number(data.amount.replace(/[^0-9]/g, "")),
    });
  }, []);

  const createCategory = useCallback(async (data: CreateCategoryDate) => {
    await APIService.createCategory(data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const data = await APIService.getCategories();

    setCategories(data);
  }, []);

  return (
    <FetchAPIContext.Provider
      value={{
        categories,
        createCategory,
        fetchCategories,
        createTransaction,
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  );
}

export function useFetchAPI(): FetchAPIProps {
  return useContext(FetchAPIContext);
}
