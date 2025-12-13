import { MoreHorizontalIcon, Plus } from "lucide-react";
import { useState } from "react";
import type { Pot } from "../../lib/types/pot";
import { animate, cn, formatPrice } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import EditDeletePopup from "./edit-delete-popup";
import TotalSavedRange from "./total-saved-range";
import { useDispatch } from "react-redux";
import { deletePot } from "../../lib/financer/financeSlicer";

type PotsItemProps = React.ComponentProps<'div'> & {
    className?: string;
    pot: Pot
    selectPot: (pot: Pot) => void
    selectPotForAddMoney: (pot: Pot) => void
    selectPotForWithdraw: (pot: Pot) => void
}


function PotsItem({ className, pot, selectPot, selectPotForAddMoney, selectPotForWithdraw, ...props }: PotsItemProps) {
    const [isPopupOn, setIsPopupOn] = useState(false);
    const dispatch = useDispatch()
    function handleEditPot(): void {
        if (pot) {
            selectPot(pot)
        }
    }

    function handleDeletePot(): void {
        if (pot) {
            dispatch(deletePot(pot.theme))
            setIsPopupOn(false)
        }
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
                    <p className="font-bold text-lg text-start">{formatPrice(pot.total)}</p>
                </div>
                <TotalSavedRange pot={pot} />
            </section>
            <section className="grid grid-cols-2 gap-x-2 md:gap-x-4">
                <Button onClick={() => selectPotForAddMoney(pot)} variant={'outline'} className="bg-background rounded-md py-2">
                    <Plus />
                    Add Moey
                </Button>
                <Button onClick={() => selectPotForWithdraw(pot)} variant={'outline'} className="bg-background rounded-md py-2">
                    Withdraw
                </Button>
            </section>
        </CardContent>
    </Card>
}


export default PotsItem;