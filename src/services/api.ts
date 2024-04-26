import {
  Category,
  CreateCategory,
  CreateTransction,
  Transaction,
  TransactionsFilter,
} from "./api-types";
import axios from "axios";

export class APIService {
  private static client = axios.create({
    baseURL: import.meta.env.VICTE_API_URL,
  });

  static async createTransaction(
    createTransactionData: CreateTransction
  ): Promise<Transaction> {
    const { data } = await APIService.client.post<Transaction>(
      "/transactions",
      createTransactionData
    );
    return data;
  }

  static async getTransactions({
    title,
    categoryId,
    beginDate,
    endDate,
  }: TransactionsFilter): Promise<Transaction[]> {
    const { data } = await APIService.client.get<Transaction[]>(
      "/transactions",
      {
        params: {
          ...(title?.length && { title }),
          ...(categoryId?.length && { categoryId }),
          beginDate,
          endDate,
        },
      }
    );
    return data;
  }

  static async createCategory(
    createCategoryData: CreateCategory
  ): Promise<Category> {
    const { data } = await APIService.client.post<Category>(
      "/categories",
      createCategoryData
    );
    return data;
  }
  static async getCategories(): Promise<Category[]> {
    const { data } = await APIService.client.get<Category[]>("/categories");
    return data;
  }
}
