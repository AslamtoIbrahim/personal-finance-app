import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { data } from "../app-sidebar";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import PotTitleItem from "./price-title-item";
import TotalSavedView from "./total-saved-view";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type CardPotsProps = React.ComponentProps<'div'> & { className?: string; }


function PotsCard({ className, ...props }: CardPotsProps) {
  const pots = useSelector((state: RootState) => state.finance.pots)
  const total = pots.reduce((t, v) => t + v.total, 0)
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
      <TotalSavedView totalSaved={total} />
      <section className="flex gap-4 md:gap-x-8 flex-wrap ">
        {
          pots.map((p, i) => <PotTitleItem key={p.theme + i} pot={p} />)
        }
      </section>
    </CardContent>


  </Card>
}


export default PotsCard;