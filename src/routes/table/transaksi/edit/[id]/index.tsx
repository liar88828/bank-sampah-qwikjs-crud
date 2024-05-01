import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { EditTransaksi } from "~/components/page/transaksi/edit-transaksi"
import { db } from "~/db/db"
import { join } from "~/db/join/join"

export const useSelectData = routeLoader$(async () => {
  console.log("execute create")
  return join.user_material()
})

export const useGetTransaksiDetail = routeLoader$(
  async ({ params, status }) => {
    const res = await db.transaksi.findDetail(Number(params["id"]))
    // console.log(res)
    if (!res) {
      status(404)
    }
    console.log("execute")
    return res
  },
)

export default component$(() => {
  const selectData = useSelectData()
  const loadData = useGetTransaksiDetail()

  return <EditTransaksi select={selectData.value} data={loadData.value} />
})
