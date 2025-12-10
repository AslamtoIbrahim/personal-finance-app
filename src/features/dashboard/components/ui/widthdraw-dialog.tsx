import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { moneySchema } from "../../lib/schemas/money.schema";
import type { Money } from "../../lib/types/money";
import type { Pot } from "../../lib/types/pot";
import { cn, formatPrice } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import WithdrawRang from "./withdraw-range";

type WithdrawDialogProps = React.ComponentProps<'div'> & {
  className?: string;
  closeDialog: () => void
  pot: Pot
}


function WithdrawDialog({ className, closeDialog, pot, ...props }: WithdrawDialogProps) {
  const form = useForm<Money>({
    resolver: zodResolver(moneySchema),
    defaultValues: {
      amount: '',
    }
  })

  function onSubmit(data: Money) {
    console.log('data: ', data);
    closeDialog()
  }
  return (
    <Card className={cn("w-full max-w-74 md:max-w-md text-start ",
      'fixed z-10 -translate-1/2 top-1/2 left-1/2 ',
      className
    )} {...props}>
      <CardHeader>
        <CardTitle>Withdraw from {pot.name}</CardTitle>
        <CardDescription>
          Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.       
          </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-withdraw" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <section className="space-y-4">
              <div className="flex justify-between">
                <p className="text-xs text-start">Amount To Withdraw</p>
                <p className="font-bold text-lg text-start">{formatPrice(110)}</p>
              </div>
              <WithdrawRang withdrawValue={50} pot={pot} />
            </section>
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-withdraw">
                    Maximum Spend
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-withdraw"
                    aria-invalid={fieldState.invalid}
                    placeholder="$ e.g 100"
                    type="number"
                    autoComplete="withdraw"
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
          <Button type="submit" form="form-rhf-withdraw">
            Confirm
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}


export default WithdrawDialog;