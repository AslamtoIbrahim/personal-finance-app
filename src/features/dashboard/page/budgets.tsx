import { useState } from "react";
import AddButton from "../components/ui/add-button";
import BudgetDetailsCard from "../components/ui/budget-details-card";
import BudgetList from "../components/ui/budget-list";
import { animate, cn } from "../lib/utils";
import BudgetAddDialog from "../components/ui/budget-add-dialog";

type BudgetsProps = React.ComponentProps<'div'> & { className?: string; }


function Budgets({ className, ...props }: BudgetsProps) {
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  return <div className={cn('space-y-6', className)} {...props}>
    <BudgetDetailsCard />
    <BudgetList />
    <AddButton title="Add a budget" onClick={() => setIsBudgetDialogOpen(p => !p)} />
      <div>
        {isBudgetDialogOpen && <div onClick={() => setIsBudgetDialogOpen(false)} className="fixed inset-0 bg-foreground/30 z-10"/>}
          <BudgetAddDialog closeDialog={() => setIsBudgetDialogOpen(false)} className={cn('', animate(isBudgetDialogOpen))} />
      </div>
  </div>
}


export default Budgets;