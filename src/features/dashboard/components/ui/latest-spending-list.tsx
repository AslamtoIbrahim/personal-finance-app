import type { Category } from "../../lib/types/category";
import { cn } from "../../lib/utils";
import LatestSpendingItem from "./latest-spending-item";

type LatestSpendingListProps = React.ComponentProps<'div'> & {
    className?: string;
    categories: Category[]
    show: boolean
}


function LatestSpendingList({ className, categories, show, ...props }: LatestSpendingListProps) {
    const displayedItems = show ? categories.length : 3
    return <div className={cn('divide divide-foreground/30 divide-y',
        'transition-all duration-500 ease-in-out', `${show ? 'max-h-420' : 'max-h-62 '}`, className)} {...props}>
        {
            categories.slice(0, displayedItems).map((c, i) => <LatestSpendingItem key={i + c.date} name={c.name} price={c.amount} date={c.date} avatar={c.avatar} />)
        }
    </div>
}


export default LatestSpendingList;