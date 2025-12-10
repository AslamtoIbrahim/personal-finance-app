import { useState } from "react";
import { animate, cn, formatPrice } from "../../lib/utils";
import { Card, CardContent } from "./card";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import EditDeletePopup from "./edit-delete-popup";
import TotalSavedRange from "./total-saved-range";
import { Button } from "./button";
import MoneyAddDialog from "./money-add-dialog";
import type { Pot } from "../../lib/types/pot";
import WithdrawDialog from "./widthdraw-dialog";

type PotsItemProps = React.ComponentProps<'div'> & { className?: string;
    pot: Pot
 }


function PotsItem({ className,pot, ...props }: PotsItemProps) {
    const [isPopupOn, setIsPopupOn] = useState(false);
    const [isAddMoneyDialogOpen, setIsAddMoneyDialogOpen] = useState(false);
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

    function handleEditPot(): void {
    }

    function handleDeletePot(): void {
        console.log('delete pot');
    }

    return <Card className={cn('',
        className)} {...props}>
        <CardContent className="space-y-4">
            <section className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <div className="size-4 rounded-full" style={{ backgroundColor: pot.theme }} />
                    <p className="font-bold text-sm md:text-base">{pot.name}</p>
                </div>
                <div className="relative">
                    <MoreHorizontalIcon onClick={() => setIsPopupOn(p => !p)} className="text-foreground/50 size-5 hover:text-foreground" />
                    {isPopupOn && <div onClick={() => setIsPopupOn(false)}
                        className="fixed z-10 inset-0" />}
                    <EditDeletePopup onEditBudget={handleEditPot} onDeleteBudget={handleDeletePot} className={cn("z-20 ", animate(isPopupOn))} />
                </div>
            </section>
            <section className="space-y-4">
                <div className="flex justify-between">
                    <p className="text-xs text-start">Total Saved</p>
                    <p className="font-bold text-lg text-start">{formatPrice(110)}</p>
                </div>
                <TotalSavedRange pot={pot} />
            </section>
            <section className="grid grid-cols-2 gap-x-2 md:gap-x-4">
                <Button onClick={() => setIsAddMoneyDialogOpen(true)} variant={'outline'} className="bg-background rounded-md py-2">
                    <Plus />
                    Add Moey
                </Button>
                <Button onClick={() => setIsWithdrawDialogOpen(true)} variant={'outline'} className="bg-background rounded-md py-2">
                    Withdraw
                </Button>
            </section>
            {/* dialogs */}
            <section>
                <div>
                    {isAddMoneyDialogOpen && <div onClick={() => setIsAddMoneyDialogOpen(false)} className="fixed inset-0 bg-foreground/30 z-10" />}
                    <MoneyAddDialog pot={pot} closeDialog={() => setIsAddMoneyDialogOpen(false)} className={cn('', animate(isAddMoneyDialogOpen))} />
                </div>
                <div>
                    {isWithdrawDialogOpen && <div onClick={() => setIsWithdrawDialogOpen(false)} className="fixed inset-0 bg-foreground/30 z-10" />}
                    <WithdrawDialog pot={pot} closeDialog={() => setIsWithdrawDialogOpen(false)} className={cn('', animate(isWithdrawDialogOpen))} />
                </div>
            </section>
        </CardContent>
    </Card>
}


export default PotsItem;