import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePot } from "../../lib/financer/financeSlicer";
import { moneySchema } from "../../lib/schemas/money.schema";
import type { Money } from "../../lib/types/money";
import type { Pot } from "../../lib/types/pot";
import { cn, formatPrice } from "../../lib/utils";
import AddMoneyRange from "./add-moeny-range";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";

type MoneyAddDialogProps = React.ComponentProps<'div'> & {
    className?: string;
    closeDialog: () => void
    pot?: Pot
}


function MoneyAddDialog({ className, closeDialog, pot, ...props }: MoneyAddDialogProps) {
    if (!pot) {
        return null
    }

    const dispatch = useDispatch()
    const form = useForm<Money>({
        resolver: zodResolver(moneySchema),
        defaultValues: {
            amount: '',
        }
    })

    const watchedAmount = form.watch("amount");

    function resetMoneyValues() {
        form.reset({ amount: '', })
    };

    function onSubmit(data: Money) {
        console.log('data: ', data);
        if (data && pot) {
            dispatch(updatePot({
                lastTheme: pot.theme,
                total: pot.total + Number(data.amount)
            }))
            resetMoneyValues()
        }
        closeDialog()
    }
    return (
        <Card className={cn("w-full max-w-74 md:max-w-md text-start ",
            'fixed z-10 -translate-1/2 top-1/2 left-1/2 ',
            className
        )} {...props}>
            <CardHeader>
                <CardTitle>Add to {pot.name} </CardTitle>
                <CardDescription>
                    Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-add-money" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <section className="space-y-4">
                            <div className="flex justify-between">
                                <p className="text-xs text-start">Total Saved</p>
                                <p className="font-bold text-lg text-start">{formatPrice(pot.total)}</p>
                            </div>
                            <AddMoneyRange amount={Number(watchedAmount)} pot={pot} />
                        </section>
                        <Controller
                            name="amount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-input-amount">
                                        Maximum Spend
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-input-amount"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="$ e.g 2000"
                                        type="number"
                                        autoComplete="amount"
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
                    <Button type="button" variant="outline" onClick={resetMoneyValues}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-add-money">
                        Confirm
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}


export default MoneyAddDialog;