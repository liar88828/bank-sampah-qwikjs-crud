import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { DetailOnly } from "~/components/card/Material/DetailOnly"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"

export const useLoadMaterialId = routeLoader$(async ({ params, sharedMap }) => {
  const session: Session = sharedMap.get("session")

  return control.transaksi.transaksiDetail(
    session,
    Number(params["id_material"]),
  )
})

export default component$(() => {
  const loadData = useLoadMaterialId()
  return <DetailOnly {...loadData.value} />
})
