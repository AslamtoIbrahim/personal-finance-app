import type { RootState } from "@/store/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import RecurringBillsTable from "../components/tables/recurring-bills-table";
import SummaryCard from "../components/ui/summary-card";
import TotalBillsCard from "../components/ui/total-bills-card";
import type { SummaryDetails } from "../lib/types/summary";
import { cn, getDay } from "../lib/utils";

type RecurringProps = React.ComponentProps<'div'> & { className?: string; }


function Recurring({ className, ...props }: RecurringProps) {
    const transactions = useSelector((state: RootState) => state.finance.transactions)
    // const { tp, tu, td, paid, upcoming, duesoon } = useMemo(() => {
    const summary = useMemo(() => {
        return transactions.reduce((acc: SummaryDetails, t) => {
            if (!t.recurring) return acc
            const day = getDay(t.date)
            if (day < 20) {
                acc.paid += t.amount
                acc.tp += 1
            }
            else if (day < 25) {
                acc.duesoon += t.amount
                acc.td += 1
            }
            else {
                acc.upcoming += t.amount
                acc.tu += 1
            }

            return acc
        },
            { tp: 0, tu: 0, td: 0, paid: 0, upcoming: 0, duesoon: 0 }
        )


    }, [transactions])
    return <div className={cn('space-y-6', className)} {...props}>
        <section className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4">
            <TotalBillsCard total={-(summary.paid + summary.upcoming + summary.duesoon)} />
            <SummaryCard summary={summary} />
        </section>
        <section>
            <RecurringBillsTable />
        </section>
    </div>
}


export default Recurring;