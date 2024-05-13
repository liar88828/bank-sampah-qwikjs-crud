import { component$, Resource } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Profile } from "~/components/page/transaksi/penyerahan-sampah/Profile"
import { Riwayat } from "~/components/page/transaksi/table/Riwayat"

import { type User } from "@prisma/client"
import { type Session } from "@auth/core/types"
import { useRiwayatPenukaran } from "./layout"
import { db } from "~/db/db"
import { RiwayatTransaksi } from "~/components/page/transaksi/table/RiwayatTransaksi"
export const useLoadPenyerahan = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session
  return db.users.findId(session.user.id)
})

export default component$(() => {
  const dataLoad = useLoadPenyerahan()
  //   const data=useGetTransaksiSampah()
  const dataRiwayat = useRiwayatPenukaran()
  return (
    <div class="grid-rows-1 sm:grid  sm:space-y-5 ">
      <div class="row-span-1">
        <div class="grid gap-5 sm:grid-cols-3">
          <div class="sm:col-span-1   ">
            <Profile data={dataLoad.value as User} />
          </div>

          <div class="sm:col-span-2   ">
            <RiwayatTransaksi data={dataRiwayat.value} />
          </div>
        </div>
      </div>

      <div class="row-span-1 mt-5 sm:mt-0">
        <Riwayat data={dataRiwayat.value} />
      </div>
    </div>
  )
})
