import type z from "zod";
import type { budgetSchema } from "../schemas/budget.schema";

export type Budget = z.infer<typeof budgetSchema>