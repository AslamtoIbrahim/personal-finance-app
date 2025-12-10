import type { Pot } from "../../lib/types/pot";
import { cn, formatPrice } from "../../lib/utils";

type WithdrawRangProps = React.ComponentProps<'div'> & {
    className?: string;
    pot: Pot
    withdrawValue: number;
}


function WithdrawRang({ className, pot,withdrawValue, ...props }: WithdrawRangProps) {
    const addition = pot.target > ((pot.total * 100) / pot.target) ? (pot.total * 100) / pot.target + withdrawValue : 100
    const substraction = 100 - addition + withdrawValue
    return <div>
        <section className={cn('w-full bg-background rounded', className)} {...props}>
            <div className="flex">
                <div className={`h-2 rounded-2xl`} style={{
                    backgroundColor: pot.theme,
                    width: `${addition}%`
                }} />
                <div className={`h-2 rounded-2xl bg-red-500`} style={{
                    width: `${substraction}%`
                }} />
            </div>
        </section>
        <section className="flex items-center justify-between text-xs py-2">
            <p className="font-semibold">{(pot.total * 100) / pot.target}%</p>
            <p className="text-foreground/75">Target of {formatPrice(pot.target)}</p>
        </section>
    </div>
}


export default WithdrawRang;