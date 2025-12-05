import CardBudgets from "../components/ui/card-budgets";
import CardPots from "../components/ui/card-pots";
import CardTransactions from "../components/ui/card-transactions";
import CardView from "../components/ui/card-view";
import { cn } from "../lib/utils";

type OverviewProps = React.ComponentProps<'div'> & { className?: string; }


function Overview({ className, ...props }: OverviewProps) {
    return <div className={cn('space-y-4', className)} {...props}>
        <div className="flex flex-col md:flex-row items-center gap-2">
            <CardView className="bg-foreground text-background" title="current balance" price={4836.00} />
            <CardView title="income" price={3814.25} />
            <CardView title="expenses" price={1700.50} />
        </div>
        <CardPots />
        <CardTransactions />
        <CardBudgets />
    </div>
}


export default Overview;