import { cn } from "../../lib/utils";
import BudgetItem from "./budget-item";

type BudgetListProps = React.ComponentProps<'div'> & { className?: string; }


function BudgetList({ className, ...props }: BudgetListProps) {

    return <div className={cn('space-y-4', className)} {...props}>

        {[...Array(2)].map((_, i) => <BudgetItem key={i} />)}

    </div>
}


export default BudgetList;