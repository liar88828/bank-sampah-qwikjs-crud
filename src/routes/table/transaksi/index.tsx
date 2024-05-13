import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { TableIndexTransaksi } from "~/components/page/transaksi/table-index-transaksi"
import { db } from "~/db/db"
import { auth } from "~/controller/auth"

export const useLoadUserTransaksi = routeLoader$(async (req) => {
  const res = await db.profile.findAllUser(control.table.pagination(req))
  return { data: res, user: auth.getSession(req.sharedMap).user }
})

export default component$(() => {
  const loadData = useLoadUserTransaksi()
  return <TableIndexTransaksi data={loadData.value} />
})
