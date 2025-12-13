import z from "zod";
import { errory } from "../utils";

export const moneySchema = z
  .object({
    total: z.string().optional(),
    amount: z.string().min(1, "Please add amount"),
  })
  .superRefine((data, ctx) => {
    console.log("ctx", data);
    if(Number(data.amount) > Number(data.total)){
        errory('You can not withdraw more than total')
        ctx.addIssue({
            code: 'custom',
            message: 'withdraw amount is greater than total',
            path: ['amount']
        })
    }
  });
