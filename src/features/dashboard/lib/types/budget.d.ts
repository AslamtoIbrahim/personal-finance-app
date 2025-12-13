import type z from "zod";
import type { budgetSchema } from "../schemas/budget.schema";

export type CreateBudgetType = z.infer<typeof budgetSchema>;

export type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

export type UpdateBudgetPaylod = Partial<Budget> & {
  lastCategory: string
}
