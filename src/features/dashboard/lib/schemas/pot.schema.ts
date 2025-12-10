import z from "zod";

export const potSchema = z.object({
    name: z.string().min(3, "Please add pot name"),
    target: z.string().min(1, "Please add pot target")
})