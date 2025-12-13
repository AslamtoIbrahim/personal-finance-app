import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { potSchema } from "../../lib/schemas/pot.schema";
import type { CreatePotType, Pot } from "../../lib/types/pot";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { useDispatch } from "react-redux";
import { addNewPot, updatePot } from "../../lib/financer/financeSlicer";
import uniqolor from "uniqolor";
import { useEffect } from "react";

type PotAddDialogProps = React.ComponentProps<'div'> & {
  className?: string;
  closeDialog: () => void
  pot?: Pot
}


function PotAddDialog({ className, closeDialog, pot, ...props }: PotAddDialogProps) {
  const dispatch = useDispatch()
  const form = useForm<CreatePotType>({
    resolver: zodResolver(potSchema),
    defaultValues: {
      name: '',
      target: '',
    }
  })

  useEffect(() => {
    if (pot) {
      form.reset({
        name: pot.name,
        target: pot.target.toString(),
      })
    }

    return () => resetPotsValues()

  }, [pot, form]);

  const resetPotsValues = () => {
    form.reset({
      name: '',
      target: '',
    })
  };

  function onSubmit(data: CreatePotType) {
    console.log('data: ', data);
    const color = uniqolor(`${new Date() + data.name + data.target + new Date()}`).color
    if (pot) {
      dispatch(updatePot({
        lastTheme: pot.theme,
        name: data.name,
        target: Number(data.target),
        theme: pot.name !== data.name ? color : pot.theme,
      }))
      resetPotsValues()
    } else {
      dispatch(addNewPot({
        name: data.name,
        target: Number(data.target),
        theme: color,
        total: 0
      }))
      resetPotsValues()
    }
    closeDialog()

  }

  return (
    <Card className={cn("w-full max-w-74 md:max-w-md text-start ",
      'fixed z-10 -translate-1/2 top-1/2 left-1/2 ',
      className
    )} {...props}>
      <CardHeader>
        <CardTitle>{pot ? 'Edit' : 'Add'} Pot</CardTitle>
        {pot ? <CardDescription>
          If your savings target change, feel free to edit your pots.
        </CardDescription> :
          <CardDescription>
            Create a pot to set savings targets. These can help keep you on track as you save for special purchases.
          </CardDescription>}
      </CardHeader>
      <CardContent>
        <form id="form-rhf-pot" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-name">
                    Pot Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g Rainy Days"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="target"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-target">
                    Target
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-target"
                    aria-invalid={fieldState.invalid}
                    placeholder="$ e.g 2000"
                    type="number"
                    autoComplete="target"
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
          <Button type="button" variant="outline" onClick={resetPotsValues}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-pot">
            {pot ? 'Edit' : 'Add'} pot
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )

}


export default PotAddDialog;