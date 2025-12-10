import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { data } from "../app-sidebar";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import PriceTitleItem from "./price-title-item";
import { ChartPieDonutText } from "../charts/chart-pie-donut-text";

type CardBudgetsProps = React.ComponentProps<'div'> & { className?: string; }


function BudgetsCard({ className, ...props }: CardBudgetsProps) {
    return <Card className={cn('', className)} {...props}>

        <CardHeader>
            <div className="flex items-center w-full justify-between">
                <CardTitle>Budgets</CardTitle>
                <Button variant={'link'}>
                    <Link to={`/${data.items[2].url}`} className="capitalize text-xs md:text-base">see details</Link>
                    <ChevronRightIcon />
                </Button>
            </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-8 items-center">
            <ChartPieDonutText />
            <section className="flex gap-4 md:gap-x-8 flex-wrap  ">
                {
                    [...Array(4)].map((_, i) => <PriceTitleItem className=" " key={i} title={`title ${i * 544}`} price={110} />)
                }
            </section>
        </CardContent>


    </Card>
}


export default BudgetsCard;