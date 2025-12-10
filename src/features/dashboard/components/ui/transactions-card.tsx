import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ChevronRightIcon } from "lucide-react";
import { data } from "../app-sidebar";
import TransactionsItem from "./transactions-item";

type CardTransactionsProps = React.ComponentProps<'div'> & { className?: string; }


function TransactionsCard({ className, ...props }: CardTransactionsProps) {
  return <Card className={cn('', className)} {...props}>

    <CardHeader>
      <div className="flex items-center w-full  justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button variant={'link'}>
          <Link to={`/${data.items[1].url}`} className="capitalize text-xs md:text-base">view all</Link>
          <ChevronRightIcon />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="">
      {[...Array(5)].map((_, i) => <TransactionsItem key={i} price={55.5} name="Savory Bites Bistro" date="2024-08-01T18:40:33Z" />)}
    </CardContent>


  </Card>
}


export default TransactionsCard;