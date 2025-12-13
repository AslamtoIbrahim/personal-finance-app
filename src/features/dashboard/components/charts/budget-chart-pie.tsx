"use client"

import { Label, Pie, PieChart } from "recharts"

import type { RootState } from "@/store/store"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from 'react-responsive'
import { formatPrice } from "../../lib/utils"
import {
    CardContent
} from "../ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './chart'

const chartConfig = {
    visitors: {
        label: "Visitors",
    },

} satisfies ChartConfig

export function BudgetChartPie() {
    const budgets = useSelector((state: RootState) => state.finance.budgets)
    const transactions = useSelector((state: RootState) => state.finance.transactions)
    const budgetConfig = budgets.map(b => {
        const { theme, ...res } = b
        return { ...res, fill: theme }
    })
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 425px)'
    })
    const totalVisitors = useMemo(() => {
        return budgets.reduce((acc, b) => acc + b.maximum, 0)
    }, [budgets])

    const expenses = useMemo(() => {
        const includesBudgets = budgets.map(b => b.category)
        return transactions.reduce((acc, t) => {
            if (!includesBudgets.includes(t.category)) return acc
            return acc - t.amount
        }, 0)
    }, [transactions])

    return (
        <div className="flex flex-col">
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={budgetConfig}
                            dataKey="maximum"
                            nameKey="category"
                            innerRadius={isDesktopOrLaptop ? 70 : 45}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground truncate font-bold text-sm md:text-base xl:text-2xl"
                                                >
                                                    {formatPrice(expenses)}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 20}
                                                    className="fill-muted-foreground text-[10px] lg:text-base"
                                                >
                                                    of {formatPrice(totalVisitors)} limit
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </div>
    )
}
