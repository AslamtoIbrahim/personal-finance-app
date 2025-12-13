import type { SummaryDetails } from "../../lib/types/summary";
import { cn, formatPrice } from "../../lib/utils";
import { Card, CardContent, CardTitle } from "./card";

type SummaryCardProps = React.ComponentProps<'div'> & {
    className?: string;
    // paid: number
    // upcoming: number
    // duesoom: number
    summary : SummaryDetails
}


function SummaryCard({ className, summary, ...props }: SummaryCardProps) {
    return <Card className={cn('text-start flex flex-col justify-between', className)} {...props}>
        <CardTitle className="px-6 font-bold">
            Summary
        </CardTitle>
        <CardContent className="space-y-2 divide divide-foreground/30 divide-y">
            <div className="grid grid-cols-[2fr_1fr_1fr] py-2">
                <p className="font-light">Paid Bills</p>
                <p className="font-light">{summary.tp}</p>
                <p className="font-semibold text-end">{formatPrice(-summary.paid)}</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr] py-2">
                <p className="font-light">Total Upcoming</p>
                <p className="font-light flex-1">{summary.tu}</p>
                <p className="font-semibold text-end">{formatPrice(-summary.upcoming)}</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr] py-2 text-destructive">
                <p className="font-light">Due Soon</p>
                <p className="font-light">{summary.td}</p>
                <p className="font-semibold text-end">{formatPrice(-summary.duesoon)}</p>
            </div>
        </CardContent>
    </Card>

}


export default SummaryCard;