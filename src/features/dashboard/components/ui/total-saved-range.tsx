import type { Pot } from "../../lib/types/pot";
import { cn, formatPrice } from "../../lib/utils";

type TotalSavedRangeProps = React.ComponentProps<'div'> & {
    className?: string;
    pot: Pot
     
}


function TotalSavedRange({ className, pot,  ...props }: TotalSavedRangeProps) {
    const percent = pot.target > ((pot.total * 100) / pot.target) ? (pot.total * 100) / pot.target : 100
    return <div>
        <section className={cn('w-full bg-background rounded', className)} {...props}>
            <div className={`h-2 rounded-2xl`} style={{ backgroundColor: pot.theme, 
                width: `${percent}%` }} />
        </section>
        <section className="flex items-center justify-between text-xs py-2">
            <p className="font-semibold">{(pot.total * 100) / pot.target}%</p>
            <p className="text-foreground/75">Target of {formatPrice(pot.target)}</p>
        </section>
    </div>
}


export default TotalSavedRange;