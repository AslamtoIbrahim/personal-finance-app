import type z from "zod";
import type { potSchema } from "../schemas/pot.schema";

export type CreatePotType = z.infer<typeof potSchema>;

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type UpdatePotPayload = Partial<Pot> & {
  lastTheme: string
}
