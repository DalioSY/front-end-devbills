import { z } from "zod";

import { createCategorySchema, createTransactionSchema } from "./schemas";

export type CreateCategoryDate = z.infer<typeof createCategorySchema>;
export type CreateTransactionDate = z.infer<typeof createTransactionSchema>;
