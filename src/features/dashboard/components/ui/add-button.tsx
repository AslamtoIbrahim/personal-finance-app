import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type AddButtonProps = React.ComponentProps<'div'> & {
    className?: string;
    title: string
    
}


function AddButton({ className, title, ...props }: AddButtonProps) {
    return <div className={cn('', className)} {...props}>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'default'} className="fixed bottom-8 right-8 rounded-full py-5" >
                    <Plus />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    </div>
}


export default AddButton;