import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { TableIndexTransaksi } from "~/components/page/transaksi/table-index-transaksi"
import { type Session } from "@auth/core/types"
import { db } from "~/db/db"

export const useLoadUserTransaksi = routeLoader$(
  async ({ sharedMap, query }) => {
    const session: Session = sharedMap.get("session") as Session

    const res = await db.profile.findAllUser(
      control.table.pagination<string>(
        session.user.id,
        query.get("page"),
        query.get("search"),
      ),
    )
    return { data: res, user: session.user }
  },
)

export default component$(() => {
  const loadData = useLoadUserTransaksi()
  return <TableIndexTransaksi data={loadData.value} />
})
