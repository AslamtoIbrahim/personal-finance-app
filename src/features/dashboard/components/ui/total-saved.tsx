import { Receipt } from "lucide-react";
import { cn } from "../../lib/utils";

type TotalSavedProps = React.ComponentProps<'div'> & { className?: string;
    totalSaved: number
 }


function TotalSaved({ className,totalSaved, ...props }: TotalSavedProps) {
    return <div className={cn('flex h-fit items-center gap-4 text-start bg-background py-3 px-4 rounded', className)} {...props}>
        <Receipt size={26} className="text-primary" />
        <div className="space-y-2">
            <p className="text-xs font-light">Total Saved</p>
            <p className="font-bold text-2xl">${totalSaved}</p>
        </div>
    </div>
}


export default TotalSaved;