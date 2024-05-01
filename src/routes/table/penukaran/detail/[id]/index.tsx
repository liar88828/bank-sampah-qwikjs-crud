import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { DetailPenukaran } from "~/components/page/penukaran/detail/detail-penukaran"
import { db } from "~/db/db"

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  const res = await db.cartPenukaran.findCartOpsi(Number(params.id))
  return res
})

export default component$(() => {
  return (
    <div class="  space-y-2 ">
      <DetailPenukaran />
    </div>
  )
})
