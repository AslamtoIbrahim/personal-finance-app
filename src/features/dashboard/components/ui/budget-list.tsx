import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import type { Budget } from "../../lib/types/budget";
import { cn } from "../../lib/utils";
import BudgetItem from "./budget-item";

type BudgetListProps = React.ComponentProps<'div'> & { className?: string;
    selectEditedBudget: (budget: Budget) => void
 }


function BudgetList({ className, selectEditedBudget, ...props }: BudgetListProps) {
    const budgets = useSelector((state: RootState) => state.finance.budgets)

    return <div className={cn('space-y-4', className)} {...props}>

        {budgets.map((b, i) => <BudgetItem selectBudget={selectEditedBudget} key={i + b.theme} budget={b} />)}
    </div>
}


export default BudgetList;