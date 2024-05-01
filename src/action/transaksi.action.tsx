import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { db } from "~/db/db"
import { zodTransaksi } from "~/lib/zod/Zod"

// CREATE ----------
export const useCreateTransaksi = globalAction$(async (data, { redirect }) => {
  const newData = {
    tgl_transaksi: new Date(data.tgl_transaksi),
    id_user: data.id_user,
    // berat: Number(data.berat),
    // harga: Number(data.harga),
    // id_material: Number(data.id_material),
  }
  const user = await db.transaksi.createOne(newData)
  if (user) {
    throw redirect(302, "/table/transaksi")
  }
  console.log(user)
  return user
}, zodTransaksi)

// UPDATE -----------------
export const useUpdateTransaksi = globalAction$(
  async (data, { redirect, params }) => {
    const id = Number(params["id"])

    const newData = {
      tgl_transaksi: new Date(data.tgl_transaksi),
      id_user: data.id_user,
      // berat: Number(data.berat),
      // harga: Number(data.harga),
      // id_material: Number(data.id_material),
    }

    const user = await db.transaksi.updateOne(id, newData)
    if (user) {
      throw redirect(302, `/table/transaksi/detail/${id}`)
    }

    return user
  },
  zodTransaksi,
)

// DELETE ---------------
export const useDeleteTransaksi = globalAction$(
  async (data) => {
    return await db.profile.deleteOne(Number(data.id))
  },
  zod$({ id: z.string() }),
)

export const useDeleteTransaksiMove = globalAction$(
  async (data, { redirect }) => {
    const user = await db.transaksi.deleteOne(Number(data.id))
    if (user) {
      throw redirect(302, "/table/transaksi")
    }
    return user
  },
  zod$({ id: z.string() }),
)
