import { cn } from "../lib/utils";

type PotsProps = React.ComponentProps<'div'> & { className?: string;}


function Pots({ className, ...props }: PotsProps) {
  return <div className={cn('',className)} {...props}>
    Pots
</div>
}


export default Pots;