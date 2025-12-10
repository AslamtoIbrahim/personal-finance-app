import RecurringBillsTable from "../components/tables/recurring-bills-table";
import SummaryCard from "../components/ui/summary-card";
import TotalBillsCard from "../components/ui/total-bills-card";
import { cn } from "../lib/utils";

type RecurringProps = React.ComponentProps<'div'> & { className?: string; }


function Recurring({ className, ...props }: RecurringProps) {
    return <div className={cn('space-y-6', className)} {...props}>
        <section className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4">
            <TotalBillsCard total={564.94} />
            <SummaryCard paid={7370} total={2135} due={259.98} />
        </section>
        <section>
            <RecurringBillsTable />
        </section>
    </div>
}


export default Recurring;