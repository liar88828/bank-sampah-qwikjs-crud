import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { TimeLine, getStatusObject } from "~/components/timeline/TimeLine"
import { Heads } from "~/components/basic/head/Heads"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"
import { DetailOnly } from "~/components/card/Material/DetailOnly"

export const useLoadMaterialId = routeLoader$(async ({ params, sharedMap }) => {
  const session: Session = sharedMap.get("session")

  return control.transaksi.transaksiDetail(
    session,
    Number(params["id_material"]),
  )
})

export default component$(() => {
  const loadData = useLoadMaterialId()
  return (
    <div class="container space-y-2 ">
      <Heads />

      <div class=" card-compact card static bg-base-100">
        <div class="card-body">
          <h1 class="card-title">Process Transaksi</h1>
          <div class="flex justify-center">
            <TimeLine status={getStatusObject("SIMPAN")} />
          </div>
        </div>
      </div>

      {/* <h1 class="card-title">Material</h1> */}
      <DetailOnly {...loadData.value} />
    </div>
  )
})
