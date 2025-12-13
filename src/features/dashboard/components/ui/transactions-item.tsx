import type { Transaction } from "../../lib/types/transaction";
import { cn, formatDate, formatPrice } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
type ItemTransactionsProps = React.ComponentProps<'div'> & {
    className?: string;
    transaction: Transaction
}


function TransactionsItem({ className,transaction, ...props }: ItemTransactionsProps) {
    return <div className={cn('flex gap-y-2 md:items-center flex-col md:flex-row justify-between p-2', className)} {...props}>
        <section className="flex items-center gap-x-2 md:gap-x-4">
            <Avatar>
                <AvatarImage src={transaction.avatar} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-bold truncate">{transaction.name}</p>
        </section>
        <section className="text-start flex flex-row-reverse items-center justify-between md:block md:text-end">
            <p className={cn("font-semibold ", `${transaction.amount > 0 ? 'text-primary' : ''} `)}>{formatPrice(transaction.amount)}</p>
            <p className="text-sm">{formatDate(transaction.date)}</p>
        </section>
    </div>
}


export default TransactionsItem;