import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { data } from "../app-sidebar";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import RecurringBillsItem from "./recurring-bills-item";

type CardRecurringProps = React.ComponentProps<'div'> & { className?: string; }


function RecurringBillsCard({ className, ...props }: CardRecurringProps) {
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
            <RecurringBillsItem title="Paid Bills" price={370} />
            <RecurringBillsItem title="Total Upcoming" price={135} />
            <RecurringBillsItem title="Due Soon" price={59.98} />
        </CardContent>


    </Card>
}


export default RecurringBillsCard;