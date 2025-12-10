"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    CardContent
} from "../ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './chart'
import { formatPrice } from "../../lib/utils"
import { useMediaQuery } from 'react-responsive'

export const description = "A donut chart with text"

const chartData = [
    { browser: "chrome", visitors: 100, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 100, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 100, fill: "var(--color-edge)" },
    { browser: "other", visitors: 100, fill: "var(--color-other)" },
    { browser: "ear", visitors: 100, fill: "var(--color-edge)" },
]


// "budgets": [
//         {
//             "category": "Entertainment",: label
//             "maximum": 50.00, : visitors
//             "theme": "#277C78" : color
//         },]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome 🥩",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
    ear: {
        label: "Ear",
        color: "#2abb",
    },
} satisfies ChartConfig

export function ChartPieDonutText() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 425px)'
    })
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

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
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
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
                                                    {formatPrice(totalVisitors)}
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
