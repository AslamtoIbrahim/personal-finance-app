import type { Pot } from "../../lib/types/pot";
import { cn, formatPrice } from "../../lib/utils";

type AddMoneyRangeProps = React.ComponentProps<'div'> & {
    className?: string;
    pot: Pot
    amount: number
}


function AddMoneyRange({ className, pot, amount, ...props }: AddMoneyRangeProps) {
    const percent = pot.target > ((pot.total * 100) / pot.target) ? (pot.total * 100) / pot.target : 100
    const moneyPercent = pot.target > ((amount * 100) / pot.target) ? (amount * 100) / pot.target : 100
     

    return <div>
        <section className={cn('w-full flex items-center bg-background rounded', className)} {...props}>
            <div className={`h-2 rounded-2xl`} style={{
                backgroundColor: pot.theme,
                width: `${percent}%`
            }} />
            <div className={`h-2 rounded-2xl bg-primary`} style={{
                width: `${moneyPercent}%`
            }} />
        </section>
        <section className="flex items-center justify-between text-xs py-2">
            <p className="font-semibold">{((pot.total * 100) / pot.target).toFixed(2)}%</p>
            <p className="text-foreground/75">Target of {formatPrice(pot.target)}</p>
        </section>
    </div>
}


export default AddMoneyRange;