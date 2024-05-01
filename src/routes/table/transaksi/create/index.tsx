import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { TransaksiCreate } from "~/components/page/transaksi/create-transaksi"
import { join } from "~/db/join/join"
export const useSelectData = routeLoader$(async () => {
  console.log("execute create")
  return join.user_material()
})
export default component$(() => {
  const loadData = useSelectData()
  return <TransaksiCreate select={loadData.value} />
})
