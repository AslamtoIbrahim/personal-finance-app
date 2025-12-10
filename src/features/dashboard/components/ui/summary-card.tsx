import { cn, formatPrice } from "../../lib/utils";
import { Card, CardContent, CardTitle } from "./card";

type SummaryCardProps = React.ComponentProps<'div'> & {
    className?: string;
    paid: number
    total: number
    due: number
}


function SummaryCard({ className, paid, total, due, ...props }: SummaryCardProps) {
    return <Card className={cn('text-start flex flex-col justify-between', className)} {...props}>
        <CardTitle className="px-6 font-bold">
            Summary
        </CardTitle>
        <CardContent className="space-y-2 divide divide-foreground/30 divide-y">
            <div className="flex justify-between py-2">
                <p className="font-light">Paid Bills</p>
                <p className="font-semibold">{formatPrice(paid)}</p>
            </div>
            <div className="flex justify-between py-2">
                <p className="font-light">Total Upcoming</p>
                <p className="font-semibold">{formatPrice(total)}</p>
            </div>
            <div className="flex justify-between py-2 text-destructive">
                <p className="font-light">Due Soon</p>
                <p className="font-semibold">{formatPrice(due)}</p>
            </div>
        </CardContent>
    </Card>

}


export default SummaryCard;