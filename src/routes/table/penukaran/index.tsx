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

export const useLoadPenukaranTable = routeLoader$(
  async ({ sharedMap, query }) => {
    const session = sharedMap.get("session") as Session
    return db.cartPenukaran.findTransaksi(
      control.table.pagination<string>(
        session.user.id,
        query.get("page"),
        query.get("search"),
      ),
    )
  },
)

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
