import { cn } from "../lib/utils";

type BudgetsProps = React.ComponentProps<'div'> & { className?: string;}


function Budgets({ className, ...props }: BudgetsProps) {
  return <div className={cn('',className)} {...props}>
    Budgets
</div>
}


export default Budgets;