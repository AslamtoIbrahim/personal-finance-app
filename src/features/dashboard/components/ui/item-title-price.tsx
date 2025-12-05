import { cn, formatPrice } from "../../lib/utils";
import uniqolor from 'uniqolor';

type ItemPotsProps = React.ComponentProps<'div'> & {
    className?: string;
    title: string;
    price: number;
}


function ItemTitlePrice({ className, title, price, ...props }: ItemPotsProps) {
    return <div className={cn('w-20 h-fit flex gap-3', className)} {...props}>
        <div className="rounded w-1 shrink-0" style={{ background: uniqolor(title).color }} />
        <div className="text-start space-y-1">
            <p className="text-xs font-light">{title}</p>
            <p className="text-sm font-bold">${formatPrice(price)}</p>
        </div>
    </div>
}


export default ItemTitlePrice;