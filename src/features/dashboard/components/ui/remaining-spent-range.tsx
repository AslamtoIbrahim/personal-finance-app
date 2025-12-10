import { cn } from "../../lib/utils";

type RemainingSpentRangeProps = React.ComponentProps<'div'> & {
    className?: string;
    remain: number,
    spent: number
    color: string
}


function RemainingSpentRange({ className, remain, spent,color, ...props }: RemainingSpentRangeProps) {
    const percent = (spent * 100 )/ (spent + remain)
    return <div className={cn('w-full bg-background rounded p-1.5', className)} {...props}>
        <div className={`h-7 rounded`} style={{backgroundColor: color, width: `${percent}%`}}/>
    </div>
}


export default RemainingSpentRange;