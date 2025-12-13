import type { Pot } from "../../lib/types/pot";
import { cn, formatPrice } from "../../lib/utils";

type ItemPotsProps = React.ComponentProps<'div'> & {
    className?: string;
    pot: Pot
}


function PotTitleItem({ className, pot, ...props }: ItemPotsProps) {
    return <div className={cn('w-20 h-fit flex gap-3', className)} {...props}>
        <div className="rounded w-1 shrink-0" style={{ background: pot.theme }} />
        <div className="text-start space-y-1">
            <p className="text-xs font-light text-nowrap">{pot.name}</p>
            <p className="text-sm font-bold">{formatPrice(pot.total)}</p>
        </div>
    </div>
}


export default PotTitleItem;