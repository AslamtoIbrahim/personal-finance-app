import { useMemo } from "react";
import type { Budget } from "../../lib/types/budget";
import { cn, formatPrice } from "../../lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type BudgetTitleItemProps = React.ComponentProps<'div'> & { className?: string; 
    budget: Budget
}


function BudgetTitleItem({ className,budget, ...props }: BudgetTitleItemProps) {
    const transactions = useSelector((state: RootState) => state.finance.transactions)
    const expenses = useMemo(()=> {
        return transactions.reduce((acc, t) => {
            if(t.category !== budget.category) return acc
            return acc + t.amount
        }, 0)
    } , [transactions])
    return <div className={cn('h-fit flex gap-3', className)} {...props}>
        <div className="rounded w-1 shrink-0" style={{ background: budget.theme }} />
        <div className="text-start space-y-1 text-nowrap">
            <p className="text-sm font-light ">{budget.category}</p>
            <p className="text-[10px] font-light"><span className="font-bold text-[11px]">{formatPrice(-expenses)}</span> of {formatPrice(budget.maximum)}</p>
        </div>
    </div>
}


export default BudgetTitleItem;