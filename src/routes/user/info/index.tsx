import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { TransaksiSampah } from "~/components/page/info/TransaksiSampah"
import { db } from "~/db/db"
import { control } from "~/controller/controller"
import type { Session } from "@auth/core/types"

export const useGetTransaksi = routeLoader$(
  async ({ sharedMap, query, fail }) => {
    const session = sharedMap.get("session") as Session
    const transaksi = await db.profile.findUser_Material(
      control.table.pagination(
        session?.user?.id,
        query.get("page"),
        query.get("search"),
      ),
    )
    if (transaksi.length === 0) {
      throw fail(404, { message: "data not found" })
    }
    const totalTransaksi = control.transaksi.totalTransaksi(transaksi)
    if (!totalTransaksi) {
      throw fail(404, { message: "data not found" })
    }
    return {
      transaksi,
      totalTransaksi,
    }
  },
)

// export const useGetPenukaran = routeLoader$(async ({ sharedMap }) => {
//   const session = sharedMap.get("session") as Session
//   return db.profile.riwayatPenukaran(Number(session.user.id))
// })

export const useResolveAll = routeLoader$(async ({ resolveValue }) => {
  const transaksi = await resolveValue(useGetTransaksi)
  // const penukaran = await resolveValue(useGetPenukaran)
  return { ...transaksi }
})

export default component$(() => {
  return (
    <section class="   space-y-3">
      <Tables />
    </section>
  )
})

export const Tables = component$(() => {
  const dataLoad = useResolveAll()

  return (
    <div class="grid-rows-1 sm:grid  sm:space-y-5 ">
      <div class="row-span-1 ">
        <div class="space-y-5">
          {/* <RiwayatTransaksi data={data.penukaran} /> */}
          <TransaksiSampah data={dataLoad.value.totalTransaksi} />
          {/* <TotalMaterial data={data.totalMaterial as TotalMaterialProps[]} /> */}
        </div>
      </div>
    </div>
  )
})
