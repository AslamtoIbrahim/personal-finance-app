import BudgetsCard from "../components/ui/budgets-card";
import PotsCard from "../components/ui/pots-card";
import TransactionsCard from "../components/ui/transactions-card";
import TotalCard from "../components/ui/total-card";
import { cn } from "../lib/utils";
import RecurringBillsCard from "../components/ui/recurring-bills-card";

type OverviewProps = React.ComponentProps<'div'> & { className?: string; }


function Overview({ className, ...props }: OverviewProps) {
    return <div className={cn('space-y-4', className)} {...props}>
        <div className="flex flex-col md:flex-row items-center gap-2">
            <TotalCard className="bg-foreground text-background" title="current balance" price={4836.00} />
            <TotalCard title="income" price={3814.25} />
            <TotalCard title="expenses" price={1700.50} />
        </div>
        <PotsCard />
        <TransactionsCard />
        <BudgetsCard />
        <RecurringBillsCard />
    </div>
}


export default Overview;