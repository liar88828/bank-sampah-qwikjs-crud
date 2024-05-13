import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { TableIndexPenyerahan } from "~/components/page/penyerahan/table/table-index-penyerahan"
import { control } from "~/controller/controller"
import { db } from "~/db/db"

export const useLoadPenyerahan = routeLoader$(async (req) => {
  return db.cartPenyerahan.findTransaksi(control.table.pagination(req))
})

export default component$(() => {
  const loadData = useLoadPenyerahan()
  return (
    <TableIndexPenyerahan
      data={loadData.value}
      link={{
        page: "/table/penyerahan/",
      }}
    />
  )
})
