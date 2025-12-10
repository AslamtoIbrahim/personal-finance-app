import type z from "zod";
import type { moneySchema } from "../schemas/money.schema";

export type Money = z.infer<typeof moneySchema>