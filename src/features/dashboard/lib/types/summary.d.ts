export type Summary = { paid: number; upcoming: number; duesoon: number };

export type SummaryDetails = {
    tp: number
    tu: number
    td: number
} & Summary
