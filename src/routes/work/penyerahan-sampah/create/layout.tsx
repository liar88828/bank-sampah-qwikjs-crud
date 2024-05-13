import { routeAction$, routeLoader$ } from "@builder.io/qwik-city"
import { zodPenyerahanSampah } from "~/lib/zod/Zod"
import { type Session } from "@auth/core/types"
import { type SessionExample } from "~/type/global/global.type"
import { db } from "~/db/db"
import { control } from "~/controller/controller"

export const useLoadData = routeLoader$(
  async ({ query, cookie, sharedMap }) => {
    const session = sharedMap.get("session") as Session

    if (!session) {
      cookie.set("id_user", session as SessionExample)
    }

    return {
      user: await db.users.findAll(),
      queryData: {
        // id_user: query.get("id_user"),
        // id_material: query.get("id_material"),
        status: query.get("status"),
        nama_sampah: query.get("sampah.0.nama"),
        jenis_sampah: query.get("sampah.0.jenis"),
        berat_sampah: query.get("sampah.0.berat"),
      },
    }
  },
)

export const useCreatePenyerahan = routeAction$(async (data, requestEvent) => {
  const res = await control.opsi.penyerahanSampah(requestEvent, data.sampah)

  if (res) {
    throw requestEvent.redirect(302, "/work/penyerahan-sampah")
  }
  return { form: data }
}, zodPenyerahanSampah)

export const defaultValue = {
  id: 0,
  berat: 0,
  jenis: "",
  nama: "",
  status: "",
}
