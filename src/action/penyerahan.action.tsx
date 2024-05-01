import { type Session } from "@auth/core/types"
import { zodCheckout } from "~/lib/zod/table/checkOut"
import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { db } from "~/db/db"
import { control } from "~/controller/controller"

//--------Create
export const useAddCartPenyerahan = globalAction$(
  async (data, { sharedMap }) => {
    const session: Session = sharedMap.get("session") as Session
    console.info("action : useAddCartPenyerahan", data)
    return db.cartPenyerahan.addCart(session.user.id, data.id_cart, data.berat)
  },
  zod$({ id_cart: z.number(), berat: z.number() }),
)

export const useCheckOutPenyerahan = globalAction$(
  async (data, { sharedMap, fail }) => {
    const session: Session = sharedMap.get("session") as Session
    console.info("action : useCheckOutPenyerahan ", data)
    const res = await db.cartPenyerahan.checkOut(
      control.cart.send({
        id_userBuy: session.user.id,
        ...data,
      }),
    )
    if (!res) {
      fail(500, { message: "Penyerahan failed to checkout" })
    }
    return res
  },
  zodCheckout,
)

// --------Delete
export const useDeleteCartPenyerahan = globalAction$(
  async (data, { sharedMap }) => {
    const session = sharedMap.get("session") as Session
    const res = await db.cartPenyerahan.deleteCart(
      session.user.id,
      Number(data.id_cartList),
    )
    return res
  },
  zod$({ id_cartList: z.number() }),
)

export const useDeletePenyerahan = globalAction$(
  async (data, { fail }) => {
    const res = await db.profile.deleteOne(Number(data.id))
    if (res) {
      return fail(500, { message: "Penyerahan could not be deleted" })
      // throw redirect(302, "/table/material");
    }
    return res
  },
  zod$({ id: z.string() }),
)
export const useDeleteTransaksi = globalAction$(
  async (data) => {
    return db.profile.deleteOne(Number(data.id))
  },
  zod$({ id: z.string() }),
)
