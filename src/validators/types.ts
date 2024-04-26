import { z } from "zod";

import {
  createCategorySchema,
  createTransactionSchema,
  transactionsFilterSchema,
} from "./schemas";

export type CreateCategoryDate = z.infer<typeof createCategorySchema>;
export type CreateTransactionDate = z.infer<typeof createTransactionSchema>;
export type TransactionFilterDate = z.infer<typeof transactionsFilterSchema>;
