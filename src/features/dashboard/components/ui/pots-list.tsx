import { useSelector } from "react-redux";
import { animate, cn } from "../../lib/utils";
import PotsItem from "./pots-item";
import type { RootState } from "@/store/store";
import type { Pot } from "../../lib/types/pot";
import { useState } from "react";
import MoneyAddDialog from "./money-add-dialog";
import WithdrawDialog from "./widthdraw-dialog";

type PotsListProps = React.ComponentProps<'div'> & {
  className?: string;
  selectPot: (pot: Pot) => void
}


function PotsList({ className, selectPot, ...props }: PotsListProps) {
  const pots = useSelector((state: RootState) => state.finance.pots)
  const [isAddMoneyDialogOpen, setIsAddMoneyDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [potSelected, setPotSelected] = useState<Pot>();

  function handCloseAddMoneyDialog() {
    setPotSelected(undefined)
    setIsAddMoneyDialogOpen(false)
  };
  function handCloseWithdrawDialog() {
    setPotSelected(undefined)
    setIsWithdrawDialogOpen(false)
  };


  function handleSelectPotForAddMoney(pot: Pot): void {
    setPotSelected(pot)
    setIsAddMoneyDialogOpen(true)
  }

  function handleSelectPotForWithdraw(pot: Pot): void {
    setPotSelected(pot)
    setIsWithdrawDialogOpen(true)
  }

  return <div className={cn('space-y-4', className)} {...props}>

    {pots.map((p, i) => <PotsItem selectPotForWithdraw={handleSelectPotForWithdraw} 
    selectPotForAddMoney={handleSelectPotForAddMoney} selectPot={selectPot} pot={p} key={i} />)}

    {/* dialogs */}
    <section>
      <div>
        {isAddMoneyDialogOpen && <div onClick={handCloseAddMoneyDialog} className="fixed inset-0 bg-foreground/30 z-10" />}
        <MoneyAddDialog pot={potSelected} closeDialog={handCloseAddMoneyDialog} className={cn('', animate(isAddMoneyDialogOpen))} />
      </div>
      <div>
        {isWithdrawDialogOpen && <div onClick={handCloseWithdrawDialog} className="fixed inset-0 bg-foreground/30 z-10" />}
        <WithdrawDialog pot={potSelected} closeDialog={handCloseWithdrawDialog} className={cn('', animate(isWithdrawDialogOpen))} />
      </div>
    </section>
  </div>
}


export default PotsList;