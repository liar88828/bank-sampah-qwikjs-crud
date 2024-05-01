import { $, component$ } from "@builder.io/qwik"
import { useAddCart } from "~/action/penukaran.action"
import { TableChildPenukaran } from "./table-child-penukaran"
import { type Material } from "@prisma/client"

export const TablesCreatePenukaran = component$(
  ({ data }: { data: Material[] }) => {
    const dataAdd = useAddCart()

    const handlerAdd = $(async (id: number, berat: number) => {
      await dataAdd.submit({ id_cart: id, berat: berat })
    })
    const loading = dataAdd.isRunning

    return (
      <TableChildPenukaran
        data={data}
        handlerAdd={handlerAdd}
        href="/table/penukaran/create/"
        loading={loading}
      />
    )
  },
)
