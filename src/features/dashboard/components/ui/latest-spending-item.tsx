import { cn, formatDate, formatPrice } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type LatestSpendingItemProps = React.ComponentProps<'div'> & { className?: string;
    name: string
    price: number
    date: string
    avatar: string
}


function LatestSpendingItem({ className,name, price,date,avatar, ...props }: LatestSpendingItemProps) {
   return <div className={cn('flex gap-y-2 md:items-center flex-col md:flex-row justify-between p-2', className)} {...props}>
          <section className="flex items-center gap-x-2 md:gap-x-4">
              <Avatar>
                  <AvatarImage src={avatar} />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold truncate text-sm md:text-base">{name}</p>
          </section>
          <section className="text-start flex flex-row-reverse items-center justify-between md:block md:text-end">
              <p className={cn("font-semibold text-sm md:text-base ", `${price > 0 ? 'text-primary' : ''} `)}>{formatPrice(price)}</p>
              <p className="text-sm">{formatDate(date)}</p>
          </section>
      </div>
}


export default LatestSpendingItem;