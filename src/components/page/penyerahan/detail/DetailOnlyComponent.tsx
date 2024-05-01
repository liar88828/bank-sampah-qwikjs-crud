import { component$ } from "@builder.io/qwik"
import { SampahMaterial } from "~/components/card/Material/SampahMaterial"
import { StatusLine } from "./StatusLine"
import type { PropsFindOpsi } from "~/type/db/cart.type"
import { type PropsStatus } from "~/components/timeline/TimeLine"

export const DetailOnlyComponent = component$(
  ({ data }: { data: PropsFindOpsi }) => {
    return (
      <div class="  space-y-2 ">
        <StatusLine status={data?.Transaksi.id_status as PropsStatus} />
        <SampahMaterial data={data} />
      </div>
    )
  },
)
