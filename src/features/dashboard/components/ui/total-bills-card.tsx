import { ReceiptText } from "lucide-react";
import { cn, formatPrice } from "../../lib/utils";
import { Card, CardContent, CardTitle } from "./card";

type TotalBillsCardProps = React.ComponentProps<'div'> & {
    className?: string;
    total: number
}


function TotalBillsCard({ className, total, ...props }: TotalBillsCardProps) {
    return <Card className={cn('bg-foreground text-background text-start flex flex-col justify-between', className)} {...props}>
        <CardTitle className="px-6 ">
            <ReceiptText className="size-10"/>
        </CardTitle>
        <CardContent className="font-bold space-y-2">
            <p className="text-xl">Total Bills</p>
            <p className="text-3xl">{formatPrice(total)}</p>
        </CardContent>
    </Card>
}


export default TotalBillsCard;