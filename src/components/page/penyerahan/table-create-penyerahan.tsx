import { $, component$ } from "@builder.io/qwik"
import { TableChildPenyerahan } from "./table/table-child-penyerahan"
import { useAddCartPenyerahan } from "~/action/penyerahan.action"
import { type Material } from "@prisma/client"

export const TablesCreatePenyerahan = component$(
  // () => {
  ({ data }: { data: Material[] }) => {
    const dataAdd = useAddCartPenyerahan()

    const handlerAdd = $(async (id: number, berat: number) => {
      await dataAdd.submit({
        id_cart: id,
        berat: berat,
      })
    })
    const loading = dataAdd.isRunning

    return (
      <TableChildPenyerahan
        data={data}
        handlerAdd={handlerAdd}
        href="/user/penyerahan/create/"
        loading={loading}
      />
    )
  },
)
