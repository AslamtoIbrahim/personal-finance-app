import { Edit } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import AlertDialogDestructiveDemo from "./delete-dialog";

type EditDeletePopupProps = React.ComponentProps<'div'> & {
    className?: string;
    onEditBudget?: () => void
    onDeleteBudget?: () => void
}


function EditDeletePopup({ className, onEditBudget, onDeleteBudget, ...props }: EditDeletePopupProps) {
    return <div className={cn('absolute w-fit flex flex-col items-start bg-background rounded shadow right-0 py-2 px-3', className)} {...props}>
        <Button onClick={onEditBudget} variant={'ghost'} className="text-start w-full flex items-center justify-start">
            <Edit />
            Edit
        </Button>
        <AlertDialogDestructiveDemo onDeleteClick={onDeleteBudget} />
        
    </div>
}


export default EditDeletePopup;