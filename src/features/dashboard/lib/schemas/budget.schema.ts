import * as z from "zod";

export const budgetSchema = z.object({
  category: z
    .string()
    .min(1, "Please select a category.") 
    ,
  maximum: z.string().min(1, 'Please add maximum spend'),
});
