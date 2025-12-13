import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ChevronRightIcon } from "lucide-react";
import { data } from "../app-sidebar";
import TransactionsItem from "./transactions-item";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type CardTransactionsProps = React.ComponentProps<'div'> & { className?: string; }


function TransactionsCard({ className, ...props }: CardTransactionsProps) {
  const transactions = useSelector((state: RootState) => state.finance.transactions)

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
    <CardContent>
      {transactions.slice(0, 5).map((t, i) => <TransactionsItem key={t.date + i} transaction={t} />)}
    </CardContent>


  </Card>
}


export default TransactionsCard;