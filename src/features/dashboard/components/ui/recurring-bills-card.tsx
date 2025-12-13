import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, getDay } from "../../lib/utils";
import { data } from "../app-sidebar";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import RecurringBillsItem from "./recurring-bills-item";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useMemo } from "react";
import type { Summary } from "../../lib/types/summary";

type CardRecurringProps = React.ComponentProps<'div'> & { className?: string; }


function RecurringBillsCard({ className, ...props }: CardRecurringProps) {
    const transactions = useSelector((state: RootState) => state.finance.transactions)
    const { paid, upcoming, duesoon } = useMemo(() => {
        return transactions.reduce((acc: Summary, t) => {
            if(!t.recurring) return acc
            const day = getDay(t.date)
            if (day < 20) acc.paid += t.amount
            else if (day < 25) acc.duesoon += t.amount
            else acc.upcoming += t.amount

            return acc
        },
            { paid: 0, upcoming: 0, duesoon: 0 }
        )


    }, [transactions])
    return <Card className={cn('', className)} {...props}>

        <CardHeader>
            <div className="flex items-center w-full  justify-between">
                <CardTitle>Recurring Bills</CardTitle>
                <Button variant={'link'}>
                    <Link to={`/${data.items[4].url}`} className="capitalize text-xs md:text-base">see details</Link>
                    <ChevronRightIcon />
                </Button>
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <RecurringBillsItem title="Paid Bills" price={-paid} />
            <RecurringBillsItem title="Total Upcoming" price={-upcoming} />
            <RecurringBillsItem title="Due Soon" price={-duesoon} />
        </CardContent>


    </Card>
}


export default RecurringBillsCard;