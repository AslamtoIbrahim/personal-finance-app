import type { RootState } from "@/store/store";
import { ChevronRightIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { data } from "../app-sidebar";
import { BudgetChartPie } from "../charts/budget-chart-pie";
import BudgetTitleItem from "./budget-title-item";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type CardBudgetsProps = React.ComponentProps<'div'> & { className?: string; }


function BudgetsCard({ className, ...props }: CardBudgetsProps) {
    const budgets = useSelector((state: RootState) => state.finance.budgets)
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
            <BudgetChartPie />
            <section className="flex gap-4 md:gap-x-8 flex-wrap  ">
                {
                    budgets.slice(0, 4).map((b, i) => <BudgetTitleItem key={b.theme + i} budget={b} />)
                }
            </section>
        </CardContent>


    </Card>
}


export default BudgetsCard;