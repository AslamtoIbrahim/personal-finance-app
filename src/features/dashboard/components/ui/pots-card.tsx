import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { data } from "../app-sidebar";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import PriceTitleItem from "./price-title-item";
import TotalSavedView from "./total-saved-view";

type CardPotsProps = React.ComponentProps<'div'> & { className?: string; }


function PotsCard({ className, ...props }: CardPotsProps) {
  return <Card className={cn('', className)} {...props}>

    <CardHeader>
      <div className="flex items-center w-full  justify-between">
        <CardTitle>Pots</CardTitle>
        <Button variant={'link'}>
          <Link to={`/${data.items[3].url}`} className="capitalize text-xs md:text-base">see details</Link>
          <ChevronRightIcon />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-8 ">
      <TotalSavedView totalSaved={910} />
      <section className="flex gap-4 md:gap-x-8 flex-wrap ">
        {
          [...Array(10)].map((_, i) => <PriceTitleItem key={i} title={`title ${i * 544}`} price={110} />)
        }
      </section>
    </CardContent>


  </Card>
}


export default PotsCard;