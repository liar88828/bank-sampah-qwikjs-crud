import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { DetailOnlyComponent } from "~/components/page/penyerahan/detail/DetailOnlyComponent"
import { db } from "~/db/db"

export const useLoadMaterialPenyerahan = routeLoader$(async ({ params }) => {
  const res = await db.cartPenyerahan.findCartOpsi(Number(params.id))
  return res
})

export default component$(() => {
  const loadData = useLoadMaterialPenyerahan()
  return <DetailOnlyComponent data={loadData.value} />
})
