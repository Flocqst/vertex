"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Balance = {
  market: string
  amount: number
  value: number
}

export const columns: ColumnDef<Balance>[] = [
  {
    accessorKey: "market",
    header: "Market",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "value",
    header: () => <div className="text-center">Price Feed</div>,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
 
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
]
