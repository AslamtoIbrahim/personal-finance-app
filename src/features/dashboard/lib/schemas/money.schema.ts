import z from "zod";

export const moneySchema = z.object({
    amount: z.string().min(1, 'Please add amount')
})