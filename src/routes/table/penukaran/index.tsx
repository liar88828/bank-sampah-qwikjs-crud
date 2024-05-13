import { component$ } from "@builder.io/qwik"
import { TablesIndexPenukaran } from "~/components/page/penukaran/table/table-index-penukaran"
import { db } from "~/db/db"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"

export const useFindCart = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session
  return db.cartPenukaran.findCartTrolly(session?.user?.id)
})

export const useLoadPenukaranTable = routeLoader$(async (req) => {
  return db.cartPenukaran.findTransaksi(control.table.pagination(req))
})

export default component$(() => {
  const data = useLoadPenukaranTable()
  return (
    <TablesIndexPenukaran
      data={data.value}
      link={{
        page: "/table/penukaran/",
      }}
    />
  )
})
