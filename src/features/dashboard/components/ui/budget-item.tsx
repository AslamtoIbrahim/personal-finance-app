import type { RootState } from "@/store/store";
import { ChevronDownIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBudget } from "../../lib/financer/financeSlicer";
import type { Budget } from "../../lib/types/budget";
import { animate, cn, formatPrice } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import EditDeletePopup from "./edit-delete-popup";
import LatestSpendingList from "./latest-spending-list";
import RemainingSpentRange from "./remaining-spent-range";


type BudgetItemProps = React.ComponentProps<'div'> & {
    className?: string;
    budget: Budget,
    selectBudget: (budget: Budget) => void
}



function BudgetItem({ className, budget, selectBudget, ...props }: BudgetItemProps) {
    const [isPopupOn, setIsPopupOn] = useState(false);
    const [show, setShow] = useState(false);
    const transactions = useSelector((state: RootState) => state.finance.transactions)
    const dispatch = useDispatch()
    const trans = useMemo(() => {
        return transactions.filter(t => t.category === budget.category)
    }, [transactions])

    const expenses = useMemo(() => {
        return transactions.reduce((acc, t) => {
            if (t.category !== budget.category) return acc
            return acc + t.amount
        }, 0)
    }, [transactions])


    function handleEditBudget(): void {
        selectBudget(budget)
    }
    function handleDeleteBudget(): void {
        console.log('delete budget');
        dispatch(deleteBudget(budget.category))
    }

    return <Card className={cn('',
        className)} {...props}>
        <CardContent className="space-y-4">
            <section className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <div className="size-4 rounded-full" style={{ backgroundColor: budget.theme }} />
                    <p className="font-bold text-sm md:text-base">{budget.category}</p>
                </div>
                <div className="relative">
                    <MoreHorizontalIcon onClick={() => setIsPopupOn(p => !p)} className="text-foreground/50 size-5 hover:text-foreground" />
                    {isPopupOn && <div onClick={() => setIsPopupOn(false)}
                        className="fixed z-10 inset-0" />}
                    <EditDeletePopup onEditBudget={handleEditBudget} onDeleteBudget={handleDeleteBudget} className={cn("z-20 ", animate(isPopupOn))} />
                </div>
            </section>
            <section className="space-y-4">
                <p className="text-xs text-start">Maximum of {formatPrice(budget.maximum)}</p>
                <RemainingSpentRange color={budget.theme}
                    spent={expenses} maximum={(budget.maximum)} />
            </section>
            <section
                style={{ '--before-bg': budget.theme } as CSSProperties}
                className={cn('flex text-start px-4 box',
                    'relative before:absolute before:w-1 before:top-0 before:left-0 before:h-full before:rounded'
                )}>
                <div className="flex-1">
                    <p className="text-xs">Spent</p>
                    <p className="font-bold text-sm">{formatPrice(-expenses)}</p>
                </div>
                <div className="flex-1">
                    <p className="text-xs">Remaining</p>
                    <p className="font-bold text-sm">{formatPrice((budget.maximum + expenses))}</p>
                </div>
            </section>
            <section className="bg-background p-2 rounded ">
                <div className="flex items-center justify-between pl-2">
                    <p className="text-sm md:text-base">Latest Spending</p>
                    {trans.length > 3 && <Button onClick={() => setShow(p => !p)} variant={'link'} >
                        <p className="capitalize text-xs md:text-sm">Show {show ? 'Less' : 'More'}</p>
                        {!show ? <ChevronRightIcon /> : <ChevronDownIcon />}
                    </Button>}
                </div>
                <LatestSpendingList show={show} categories={trans} />
            </section>
       
        </CardContent>
    </Card>
}


export default BudgetItem;