import { cn } from "../lib/utils";

type TransactionsProps = React.ComponentProps<'div'> & { className?: string;}


function Transactions({ className, ...props }: TransactionsProps) {
  return <div className={cn('',className)} {...props}>
    Transactions
</div>
}


export default Transactions;