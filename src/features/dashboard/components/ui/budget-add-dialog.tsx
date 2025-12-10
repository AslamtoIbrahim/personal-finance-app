import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
import { budgetSchema } from "../../lib/schemas/budget.schema";
import type { Budget } from "../../lib/types/budget";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./select";

type BudgetAddDialogProps = React.ComponentProps<'div'> & { className?: string;
  closeDialog: () => void
 }

const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const


function BudgetAddDialog({ className, closeDialog, ...props }: BudgetAddDialogProps) {
  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: '',
      maximum: '',
    }
  })

  function onSubmit(data: Budget) {
    console.log('data: ', data);
    closeDialog()
  }

  return (
    <Card className={cn("w-full max-w-74 md:max-w-md text-start ",
      'fixed z-10 -translate-1/2 top-1/2 left-1/2 ',
      className
    )} {...props}>
      <CardHeader>
        <CardTitle>Add Budget</CardTitle>
        <CardDescription>
          Choose a category to set a spending budget. These categories can help you monitor spending.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-select" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                  className="flex flex-col items-start"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Budget Category
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        {spokenLanguages.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>

                </Field>
              )}
            />

            <Controller
              name="maximum"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-maximum">
                    Maximum Spend
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-maximum"
                    aria-invalid={fieldState.invalid}
                    placeholder="$ e.g 2000"
                    type="number"
                    autoComplete="maximum"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-select">
            Add budget
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}


export default BudgetAddDialog;
