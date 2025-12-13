import { cn } from "../../lib/utils";

type RemainingSpentRangeProps = React.ComponentProps<'div'> & {
    className?: string;
    maximum: number,
    spent: number
    color: string
}


function RemainingSpentRange({ className, maximum, spent, color, ...props }: RemainingSpentRangeProps) {
    const cals = (Math.abs(spent) * 100) / maximum
    const percent = cals > 100 ? 100 : cals
    return <div className={cn('w-full bg-background rounded p-1.5', className)} {...props}>
        <div className={`h-7 rounded`} style={{ backgroundColor: color, width: `${percent}%` }} />
    </div>
}


export default RemainingSpentRange;