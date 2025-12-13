import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { BudgetChartPie } from "../charts/budget-chart-pie";
import BudgetTitleItem from "./budget-title-item";
import { Card, CardContent } from "./card";

type CardBudgetsProps = React.ComponentProps<'div'> & { className?: string; }


function BudgetDetailsCard({ className, ...props }: CardBudgetsProps) {
    const budgets = useSelector((state: RootState) => state.finance.budgets)
    return <Card className={cn('', className)} {...props}>

        <CardContent className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-8 items-center xl:grid-cols-1">
            <BudgetChartPie />
            <div className="space-y-6">
                <h2 className="text-start font-bold text-xl">Spending Summary</h2>
                <section className="grid md:grid-cols-2 gap-4 md:gap-x-10 flex-wrap  ">
                    {
                        budgets.map((b, i) => <BudgetTitleItem key={i + b.theme} budget={b} />)
                    }
                </section>
            </div>
        </CardContent>


    </Card>
}


export default BudgetDetailsCard;