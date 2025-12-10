import { useState } from "react";
import AddButton from "../components/ui/add-button";
import PotsList from "../components/ui/pots-list";
import { animate, cn } from "../lib/utils";
import PotAddDialog from "../components/ui/pot-add-dialog";

type PotsProps = React.ComponentProps<'div'> & { className?: string; }


function Pots({ className, ...props }: PotsProps) {
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);

  return <div className={cn('', className)} {...props}>
    <PotsList />
    <AddButton title="Add a pot" onClick={() => setIsBudgetDialogOpen(p => !p)} />
    <div>
      {isBudgetDialogOpen && <div onClick={() => setIsBudgetDialogOpen(false)} className="fixed inset-0 bg-foreground/30 z-10" />}
      <PotAddDialog closeDialog={() => setIsBudgetDialogOpen(false)} className={cn('', animate(isBudgetDialogOpen))} />
    </div>
  </div>
}


export default Pots;