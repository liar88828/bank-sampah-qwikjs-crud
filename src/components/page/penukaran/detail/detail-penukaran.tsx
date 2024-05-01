import { component$, Resource } from "@builder.io/qwik"
import { type PropsStatus } from "~/components/timeline/TimeLine"
import { SampahMaterial } from "~/components/card/Material/SampahMaterial"
import { Spinner } from "~/components/loading/spinner"
import { StatusLine } from "./StatusLine"
import { useLoadMaterialId } from "../../../../routes/table/penukaran/detail/[id]"

export const DetailPenukaran = component$(() => {
  const loadData = useLoadMaterialId()
  return (
    <Resource
      value={loadData}
      onPending={() => <Spinner />}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        return (
          <>
            <StatusLine status={data?.Transaksi.id_status as PropsStatus} />
            <SampahMaterial data={data} />
          </>
        )
      }}
    />
  )
})
