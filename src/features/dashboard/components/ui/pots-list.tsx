import { cn } from "../../lib/utils";
import PotsItem from "./pots-item";

type PotsListProps = React.ComponentProps<'div'> & { className?: string;}


function PotsList({ className, ...props }: PotsListProps) {
    const pot = {
        "name": "Savings",
        "target": 2000.00,
        "total": 159.00,
        "theme": "#277C78"
    }
  return <div className={cn('space-y-4',className)} {...props}>
    {[...Array(3)].map((_, i) => <PotsItem pot={pot} key={i} />)}
</div>
}


export default PotsList;