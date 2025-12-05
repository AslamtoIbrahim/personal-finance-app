import { cn, formatPrice } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type CardViewProps = React.ComponentProps<'div'> & {
    className?: string;
    title: string;
    price: number;
}


function CardView({ className, title, price, ...props }: CardViewProps) {
    return (<Card className={cn('w-full flex-1 gap-y-2 pe-2 text-start', className)} {...props}>
        <CardHeader>
            <CardTitle className="font-light text-lg text-nowrap capitalize">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-black">{formatPrice(price)}</p>
        </CardContent>
    </Card>)
}


export default CardView;