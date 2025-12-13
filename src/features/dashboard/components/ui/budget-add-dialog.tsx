import type { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type z from "zod";
import { budgetSchema } from "../../lib/schemas/budget.schema";
import type { Budget, CreateBudgetType } from "../../lib/types/budget";
// import { categories } from "../../lib/types/transaction";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./select";
import uniqolor from "uniqolor";
import { addNewBudget, updateBudget } from "../../lib/financer/financeSlicer";

type BudgetAddDialogProps = React.ComponentProps<'div'> & {
  className?: string;
  closeDialog: () => void
  budget?: Budget
}

const categories = [
  "General",
  "Dining Out",
  "Groceries",
  "Entertainment",
  "Transportation",
  "Lifestyle",
  "Personal Care",
  "Education",
  "Bills",
  "Shopping",
];


function BudgetAddDialog({ className, closeDialog, budget, ...props }: BudgetAddDialogProps) {
  const budgets = useSelector((state: RootState) => state.finance.budgets)
  const dispatch = useDispatch()
  const categoryList = useMemo(() => {
    const exists = budgets.map(b => b.category)

    // If editing, allow current category
    if (budget) {
      return categories.filter(b => !exists.includes(b) || b === budget.category)
    }
    // If adding new, exclude used categories
    return categories.filter(b => !exists.includes(b))
  }, [budgets, budget])

  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: '',
      maximum: '',
    }
  })

  useEffect(() => {
    if (budget) {
      form.reset({
        category: budget.category,
        maximum: String(budget.maximum),
      })
    }

    return () => resetValues()

  }, [budget, form]);

  const resetValues = () => {
    form.reset({
      category: '',
      maximum: ''
    })
  };

  function onSubmit(data: CreateBudgetType) {
    console.log('data', data);
    const color = uniqolor(`${new Date() + data.category + data.maximum + new Date()}`).color
    if (data) {
      if (budget) {
        console.log('budget.category 🍇', data);
        dispatch(updateBudget(
          {
            lastCategory: budget.category,
            category: data.category,
            maximum: Number(data.maximum),
            theme: budget.category !== data.category ? color : budget.theme
          }
        ))
        resetValues()
      } else {
        dispatch(addNewBudget({
          category: data.category,
          maximum: Number(data.maximum),
          theme: color
        }))
        resetValues()
      }
    }
    closeDialog()

  }

  return (
    <Card className={cn("w-full max-w-74 md:max-w-md text-start ",
      'fixed z-10 -translate-1/2 top-1/2 left-1/2 ',
      className
    )} {...props}>
      <CardHeader>
        <CardTitle>{budget ? 'Edit' : 'Add'} Budget</CardTitle>
        {!budget ? <CardDescription>
          Choose a category to set a spending budget.
          These categories can help you monitor spending.
        </CardDescription>
          :
          <CardDescription>
            As your budgets change, feel free to update your spending limits.
          </CardDescription>}
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
                      // defaultValue={budget?.category}
                      key={field.value}
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
                        <SelectSeparator />
                        {categoryList.map((c, i) => (
                          <SelectItem key={c + i} value={c}>
                            {c}
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
          <Button type="button" variant="outline" onClick={resetValues}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-select">
            {budget ? 'Edit' : 'Add'} budget
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}


export default BudgetAddDialog;
