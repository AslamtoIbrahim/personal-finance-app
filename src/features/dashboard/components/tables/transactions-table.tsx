'use client'

import { useId, useMemo, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react'

import type { Column, ColumnDef, ColumnFiltersState, PaginationState, RowData, SortingState } from '@tanstack/react-table'
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/features/dashboard/components/ui/avatar'
import { Input } from '@/features/dashboard/components/ui/input'
import { Label } from '@/features/dashboard/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/dashboard/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/dashboard/components/ui/table'

import { cn, formatDate, formatPrice } from '@/features/dashboard/lib/utils'
import type { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import type { Transaction } from '../../lib/types/transaction'
import { Button } from '../ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '../ui/pagination'
import { usePagination } from './use-pagination'

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select' | 'sorts'
    }
}

const columns: ColumnDef<Transaction>[] = [
    {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
            <div className='flex items-center gap-3'>
                <Avatar className='rounded-sm'>
                    <AvatarImage src={row.original.avatar} alt={row.original.name} />
                    <AvatarFallback className='text-xs'>CN</AvatarFallback>
                </Avatar>
                <div className='font-medium'>{row.getValue('name')}</div>
            </div>
        ),
        meta: { filterVariant: 'text' },
    },
    {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ row }) => {
            return (
                <div className={(cn('border-none focus-visible:outline-none'))}>{row.getValue('category')}</div>
            )
        },
        enableSorting: false,
        meta: {
            filterVariant: 'select'
        }
    },
    {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ row }) => <div>{formatDate(row.getValue('date'))}</div>,
        meta: { filterVariant: 'sorts' },
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
        sortingFn: 'basic',
        cell: ({ row }) => <div className={cn('font-semibold', `${(Number(row.getValue('amount')) > 0) ? 'text-primary' : ''}`)}>{formatPrice(row.getValue('amount'))}</div>,
        meta: {
            filterVariant: 'sorts'
        }
    }
]

function TransactionsTable() {
    const transactions = useSelector((state: RootState) => state.finance.transactions)

    const pageSize = 5

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: 'amount',
            desc: false
        }
    ])

    const table = useReactTable({
        data: transactions,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        enableSortingRemoval: false
    })

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage: table.getState().pagination.pageIndex + 1,
        totalPages: table.getPageCount(),
        paginationItemsToDisplay: 5
    })

    return (
        <div className='w-full space-y-4'>
            <div className='rounded-md border'>
                <div className='flex gap-3 px-4 py-6 flex-wrap'>
                    <div className='w-44'>
                        <Filter column={table.getColumn('name')!} />
                    </div>
                    <div className='w-36'>
                        <Sort table={table} />
                    </div>
                    <div className='w-44'>
                        <Filter column={table.getColumn('category')!} />
                    </div>

                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className='bg-muted/50'>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id} className='relative h-10 border-t select-none text-center'>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* pagination */}

            <div className='flex items-center justify-between gap-3 max-sm:flex-col'>
                <p className='text-muted-foreground flex-1 text-sm whitespace-nowrap' aria-live='polite'>
                    Page <span className='text-foreground'>{table.getState().pagination.pageIndex + 1}</span> of{' '}
                    <span className='text-foreground'>{table.getPageCount()}</span>
                </p>

                <div className='grow'>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    size='icon'
                                    variant='outline'
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label='Go to previous page'
                                >
                                    <ChevronLeftIcon aria-hidden='true' />
                                </Button>
                            </PaginationItem>

                            {showLeftEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {pages.map(page => {
                                const isActive = page === table.getState().pagination.pageIndex + 1

                                return (
                                    <PaginationItem key={page}>
                                        <Button
                                            size='icon'
                                            variant={`${isActive ? 'outline' : 'ghost'}`}
                                            onClick={() => table.setPageIndex(page - 1)}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {page}
                                        </Button>
                                    </PaginationItem>
                                )
                            })}

                            {showRightEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <Button
                                    size='icon'
                                    variant='outline'
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label='Go to next page'
                                >
                                    <ChevronRightIcon aria-hidden='true' />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                <div className='flex flex-1 justify-end'>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger id='results-per-page' className='w-fit whitespace-nowrap' aria-label='Results per page'>
                            <SelectValue placeholder='Select number of results' />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 25, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize} / page
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

function Filter({ column }: { column: Column<any, unknown> }) {
    const id = useId()

    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}
    const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : ''

    const sortedUniqueValues = useMemo(() => {
        if (filterVariant === 'range') return []

        const values = Array.from(column.getFacetedUniqueValues().keys())

        const flattenedValues = values.reduce((acc: string[], curr) => {
            if (Array.isArray(curr)) {
                return [...acc, ...curr]
            }

            return [...acc, curr]
        }, [])

        return Array.from(new Set(flattenedValues)).sort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column.getFacetedUniqueValues(), filterVariant])

    if (filterVariant === 'range') {
        return (
            <div className='*:not-first:mt-2'>
                <Label>{columnHeader}</Label>
                <div className='flex'>
                    <Input
                        id={`${id}-range-1`}
                        className='flex-1 rounded-r-none [-moz-appearance:textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                        value={(columnFilterValue as [number, number])?.[0] ?? ''}
                        onChange={e =>
                            column.setFilterValue((old: [number, number]) => [
                                e.target.value ? Number(e.target.value) : undefined,
                                old?.[1]
                            ])
                        }
                        placeholder='Min'
                        type='number'
                        aria-label={`${columnHeader} min`}
                    />
                    <Input
                        id={`${id}-range-2`}
                        className='-ms-px flex-1 rounded-l-none [-moz-appearance:textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                        value={(columnFilterValue as [number, number])?.[1] ?? ''}
                        onChange={e =>
                            column.setFilterValue((old: [number, number]) => [
                                old?.[0],
                                e.target.value ? Number(e.target.value) : undefined
                            ])
                        }
                        placeholder='Max'
                        type='number'
                        aria-label={`${columnHeader} max`}
                    />
                </div>
            </div>
        )
    }

    if (filterVariant === 'select') {
        return (
            <div className='*:not-first:mt-2'>
                {/* <Label htmlFor={`${id}-select`}>{columnHeader}</Label> */}
                <Select
                    value={columnFilterValue?.toString() ?? 'all'}
                    onValueChange={value => {
                        column.setFilterValue(value === 'all' ? undefined : value)
                    }}
                >
                    <SelectTrigger id={`${id}-select`} className='w-full ring ring-foreground/20'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All</SelectItem>
                        {sortedUniqueValues.map(value => (
                            <SelectItem key={String(value)} value={String(value)}>
                                {String(value)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )
    }


    return (
        <div className='*:not-first:mt-2'>
            {/* <Label htmlFor={`${id}-input`}>{columnHeader}</Label> */}
            <div className='relative'>
                <Input
                    id={`${id}-input`}
                    className='peer pl-9 ring ring-foreground/20'
                    value={(columnFilterValue ?? '') as string}
                    onChange={e => column.setFilterValue(e.target.value)}
                    placeholder={`Search ${columnHeader.toLowerCase()}`}
                    type='text'
                />
                <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                    <SearchIcon size={16} />
                </div>
            </div>
        </div>
    )
}


function Sort({ table }: { table: any }) {
    const sortOptions = [
        { label: "Latest", value: "date-desc" },
        { label: "Oldest", value: "date-asc" },

        { label: "A to Z", value: "name-asc" },
        { label: "Z to A", value: "name-desc" },

        { label: "Highest", value: "amount-desc" },
        { label: "Lowest", value: "amount-asc" },

    ];

    function handleSort(value: string) {
        if (!value) return;
        const [col, dir] = value.split('-')
        table.setSorting([
            {
                id: col,
                desc: dir === "desc",
            },
        ]);
    }
    return (
        <div className='*:not-first:mt-2'>
            <Select
                defaultValue='date-desc'
                onValueChange={handleSort}
            >
                <SelectTrigger id={`sort-select`} className='w-full ring ring-foreground/20'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )


}













export default TransactionsTable
