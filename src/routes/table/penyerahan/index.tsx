import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { TableIndexPenyerahan } from "~/components/page/penyerahan/table/table-index-penyerahan"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import { type Session } from "@auth/core/types"

export const useLoadPenyerahan = routeLoader$(async ({ sharedMap, query }) => {
  const session = sharedMap.get("session") as Session
  return db.cartPenyerahan.findTransaksi(
    control.table.pagination<string>(
      session?.user?.id,
      query.get("page"),
      query.get("search"),
    ),
  )
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
