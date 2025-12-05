import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { data } from "../app-sidebar";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import ItemTitlePrice from "./item-title-price";
import TotalSaved from "./total-saved";

type CardPotsProps = React.ComponentProps<'div'> & { className?: string; }


function CardPots({ className, ...props }: CardPotsProps) {
  return <Card className={cn('', className)} {...props}>

    <CardHeader>
      <div className="flex items-center w-full  justify-between">
        <CardTitle>Pots</CardTitle>
        <Button variant={'link'}>
          <Link to={`/${data.items[3].url}`} className="capitalize">see details</Link>
          <ChevronRightIcon />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-8 ">
      <TotalSaved totalSaved={910} />
      <section className="flex gap-4 md:gap-x-8 flex-wrap ">
        {
          [...Array(10)].map((_, i) => <ItemTitlePrice key={i} title={`title ${i * 544}`} price={110} />)
        }
      </section>
    </CardContent>


  </Card>
}


export default CardPots;