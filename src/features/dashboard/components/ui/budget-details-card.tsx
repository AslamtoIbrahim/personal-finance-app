import { cn } from "../../lib/utils";
import { ChartPieDonutText } from "../charts/chart-pie-donut-text";
import { Card, CardContent } from "./card";
import PriceTitleItem from "./price-title-item";

type CardBudgetsProps = React.ComponentProps<'div'> & { className?: string; }


function BudgetDetailsCard({ className, ...props }: CardBudgetsProps) {
    return <Card className={cn('', className)} {...props}>

        <CardContent className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-8 items-center xl:grid-cols-1">
            <ChartPieDonutText />
            <div className="space-y-6">
                <h2 className="text-start font-bold text-xl">Spending Summary</h2>
                <section className="flex gap-4 md:gap-x-8 flex-wrap  ">
                    {
                        [...Array(8)].map((_, i) => <PriceTitleItem className=" " key={i} title={`title ${i * 544}`} price={110} />)
                    }
                </section>
            </div>
        </CardContent>


    </Card>
}


export default BudgetDetailsCard;