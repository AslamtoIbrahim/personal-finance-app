import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { animate, cn, formatPrice } from "../../lib/utils";
import { Card, CardContent } from "./card";
import EditDeletePopup from "./edit-delete-popup";
import RemainingSpentRange from "./remaining-spent-range";
import LatestSpendingList from "./latest-spending-list";
import { Button } from "./button";



const trans = [
    {
        "avatar": "./assets/images/avatars/sofia-peterson.jpg",
        "name": "Sofia Peterson",
        "category": "Transportation",
        "date": "2024-08-08T08:55:17Z",
        "amount": -15.00,
        "recurring": false
    },
    {
        "avatar": "./assets/images/avatars/sebastian-cook.jpg",
        "name": "Sebastian Cook",
        "category": "Transportation",
        "date": "2024-08-06T10:05:44Z",
        "amount": -22.50,
        "recurring": false
    },
    {
        "avatar": "./assets/images/avatars/swift-ride-share.jpg",
        "name": "Swift Ride Share",
        "category": "Transportation",
        "date": "2024-08-01T18:40:33Z",
        "amount": -18.75,
        "recurring": false
    },
    {
        "avatar": "./assets/images/avatars/sofia-peterson.jpg",
        "name": "Sofia Peterson",
        "category": "Transportation",
        "date": "2024-07-09T08:55:27Z",
        "amount": -12.50,
        "recurring": false
    },
    {
        "avatar": "./assets/images/avatars/sebastian-cook.jpg",
        "name": "Sebastian Cook",
        "category": "Transportation",
        "date": "2024-07-07T11:45:55Z",
        "amount": -20.00,
        "recurring": false
    },
    {
        "avatar": "./assets/images/avatars/swift-ride-share.jpg",
        "name": "Swift Ride Share",
        "category": "Transportation",
        "date": "2024-07-02T19:50:05Z",
        "amount": -16.50,
        "recurring": false
    }
];



type BudgetItemProps = React.ComponentProps<'div'> & { className?: string; }



function BudgetItem({ className, ...props }: BudgetItemProps) {
    const [isPopupOn, setIsPopupOn] = useState(false);
    const [show, setShow] = useState(false);
    const budget = {
        "category": "Entertainment",
        "maximum": 50.00,
        "theme": "#277C78"
    }
    function handleEditBudget(): void {
    }
    function handleDeleteBudget(): void {
        console.log('delete budget');
    }

    return <Card className={cn('',
     className)} {...props}>
        <CardContent className="space-y-4">
            <section className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <div className="size-4 rounded-full" style={{ backgroundColor: budget.theme }} />
                    <p className="font-bold text-sm md:text-base">{budget.category}</p>
                </div>
                <div className="relative">
                    <MoreHorizontalIcon onClick={() => setIsPopupOn(p => !p)} className="text-foreground/50 size-5 hover:text-foreground" />
                    {isPopupOn && <div onClick={() => setIsPopupOn(false)}
                        className="fixed z-10 inset-0" />}
                    <EditDeletePopup onEditBudget={handleEditBudget} onDeleteBudget={handleDeleteBudget} className={cn("z-20 ", animate(isPopupOn))} />
                </div>
            </section>
            <section className="space-y-4">
                <p className="text-xs text-start">Maximum of {formatPrice(750)}</p>
                <RemainingSpentRange color={budget.theme} remain={259.51} spent={490.49} />
            </section>
            <section
                style={{ '--before-bg': budget.theme } as CSSProperties}
                className={cn('flex text-start px-4 box',
                    'relative before:absolute before:w-1 before:top-0 before:left-0 before:h-full before:rounded'
                )}>
                <div className="flex-1">
                    <p className="text-xs">Spent</p>
                    <p className="font-bold text-sm">{formatPrice(490.49)}</p>
                </div>
                <div className="flex-1">
                    <p className="text-xs">Remaining</p>
                    <p className="font-bold text-sm">{formatPrice(490.49)}</p>
                </div>
            </section>
            <section className="bg-background p-2 rounded ">
                <div className="flex items-center justify-between pl-2">
                    <p className="text-sm md:text-base">Latest Spending</p>
                    <Button onClick={() => setShow(p => !p)} variant={'link'} >
                        <p className="capitalize text-xs md:text-sm">Show {show ? 'Less' : 'More'}</p>
                        <ChevronRightIcon />
                    </Button>
                </div>
                <LatestSpendingList show={show} categories={trans} />
            </section>
        </CardContent>
    </Card>
}


export default BudgetItem;