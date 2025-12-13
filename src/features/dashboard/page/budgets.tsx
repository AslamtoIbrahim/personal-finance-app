import { useState } from "react";
import AddButton from "../components/ui/add-button";
import BudgetDetailsCard from "../components/ui/budget-details-card";
import BudgetList from "../components/ui/budget-list";
import { animate, cn } from "../lib/utils";
import BudgetAddDialog from "../components/ui/budget-add-dialog";
import type { Budget } from "../lib/types/budget";

type BudgetsProps = React.ComponentProps<'div'> & { className?: string; }


function Budgets({ className, ...props }: BudgetsProps) {
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget>();
  const handleSelectBudget = (budget: Budget) => {
    console.log('budget 🥞', budget);
    if (budget) {
      setSelectedBudget(budget)
      setIsBudgetDialogOpen(p => !p)
    }
  };
  
  function handCloseBackdropClick(): void {
    setSelectedBudget(undefined)
    setIsBudgetDialogOpen(false)
  }

  return <div className={cn('space-y-6', className)} {...props}>
    <BudgetDetailsCard />
    <BudgetList selectEditedBudget={handleSelectBudget} />
    <AddButton title="Add a budget" onClick={() => setIsBudgetDialogOpen(p => !p)} />

    <div>
      {isBudgetDialogOpen && <div onClick={handCloseBackdropClick} className="fixed inset-0 bg-foreground/30 z-10" />}
      <BudgetAddDialog budget={selectedBudget} closeDialog={handCloseBackdropClick} className={cn('', animate(isBudgetDialogOpen))} />
    </div>
  </div>
}


export default Budgets;