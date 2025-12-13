import { useState } from "react";
import AddButton from "../components/ui/add-button";
import PotAddDialog from "../components/ui/pot-add-dialog";
import PotsList from "../components/ui/pots-list";
import type { Pot } from "../lib/types/pot";
import { animate, cn, sonnery } from "../lib/utils";

type PotsProps = React.ComponentProps<'div'> & { className?: string; }


function Pots({ className, ...props }: PotsProps) {
  const [isPotDialogOpen, setIsPotDialogOpen] = useState(false);
  const [selectedPot, setSelectedPot] = useState<Pot>();
  const handleSelectPot = (pot: Pot) => {
    if (pot) {
      if (pot.total === 0) {
        sonnery("You should add money to be able to edit the pot");
        return
      }
      setSelectedPot(pot)
      setIsPotDialogOpen(p => !p)
    }
  };
  function handCloseBackdropClick(): void {
    setSelectedPot(undefined)
    setIsPotDialogOpen(p => !p)
  }

  return <div className={cn('', className)} {...props}>
    <PotsList selectPot={handleSelectPot} />
    <AddButton title="Add a pot" onClick={() => setIsPotDialogOpen(p => !p)} />
    <div>
      {isPotDialogOpen && <div onClick={handCloseBackdropClick} className="fixed inset-0 bg-foreground/30 z-10" />}
      <PotAddDialog pot={selectedPot} closeDialog={handCloseBackdropClick} className={cn('', animate(isPotDialogOpen))} />
    </div>
  </div>
}


export default Pots;