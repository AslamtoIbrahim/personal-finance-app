import uniqolor from "uniqolor";
import { cn, formatPrice } from "../../lib/utils";

type ItemBillsRcurringProps = React.ComponentProps<'div'> & {
    className?: string;
    title: string
    price: number
}


function RecurringBillsItem({ className, title, price, ...props }: ItemBillsRcurringProps) {
    const color = uniqolor(title).color
    return <div className={cn(' relative',
        className)} {...props}>
        <div style={{backgroundColor: color}} className="w-4 h-full absolute -left-1 top-0 rounded-lg" />
        <div className="flex items-center justify-between bg-background p-4 rounded relative">
            <p className="font-light text-sm truncate">{title}</p>
            <p className="font-bold text-sm">{formatPrice(price)}</p>
        </div>
    </div>
}


export default RecurringBillsItem;