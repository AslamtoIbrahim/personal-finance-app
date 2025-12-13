import BudgetsCard from "../components/ui/budgets-card";
import PotsCard from "../components/ui/pots-card";
import TransactionsCard from "../components/ui/transactions-card";
import TotalCard from "../components/ui/total-card";
import { cn } from "../lib/utils";
import RecurringBillsCard from "../components/ui/recurring-bills-card";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type OverviewProps = React.ComponentProps<'div'> & { className?: string; }


function Overview({ className, ...props }: OverviewProps) {
    const {current, income, expenses} = useSelector((state: RootState) => state.finance.balance)
    return <div className={cn('space-y-4', className)} {...props}>
        <div className="flex flex-col md:flex-row items-center gap-2">
            <TotalCard className="bg-foreground text-background" title="current balance" price={current} />
            <TotalCard title="income" price={income} />
            <TotalCard title="expenses" price={expenses} />
        </div>
        <PotsCard />
        <TransactionsCard />
        <BudgetsCard />
        <RecurringBillsCard />
    </div>
}


export default Overview;