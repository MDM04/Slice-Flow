import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilter } from './order-table-filter'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>
      <div className="space-y-2.5">
        <OrderTableFilter />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead className="w-35">Identificador</TableHead>
                <TableHead className="w-45">Realizado há</TableHead>
                <TableHead className="w-35">Status</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead className="w-35">Total de pedidos</TableHead>
                <TableHead className="w-41"></TableHead>
                <TableHead className="w-33"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 7 }).map((_, i) => {
                return <OrderTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
