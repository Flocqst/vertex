import { Balance, columns } from "./columns"
import { DataTable } from "./data-table"
import Wallet from "./wallet"


async function getData(): Promise<Balance[]> {
  // Fetch data from your API here.
  return [
    {
      market: "Ethereum",
      amount: 50,
      value: 1000,
    },
    // ...
  ]
}

function getWallet(): Balance[] {
  return [
    {
      market: "Ethereum",
      amount: 50,
      value: 1000,
    },
    // ...
  ]
}

export default function Page() {
  const data = getWallet()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Wallet/>
    </div>
  )
}
