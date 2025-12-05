import { cn } from "../lib/utils";

type RecurringProps = React.ComponentProps<'div'> & { className?: string; }


function Recurring({ className, ...props }: RecurringProps) {
    return <div className={cn('', className)} {...props}>
        Recurring
    </div>
}


export default Recurring;