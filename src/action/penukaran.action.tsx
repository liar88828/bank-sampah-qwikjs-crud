import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { zodCheckout } from "~/lib/zod/table/checkOut"
import { type Session } from "@auth/core/types"
import { db } from "~/db/db"
import { control } from "~/controller/controller"

// CREATE ----------------
export const useCheckOutPenukaran = globalAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session

    return db.cartPenukaran.checkOut(
      control.cart.send({
        id_userBuy: session.user.id,
        ...data,
      }),
    )
  },
  zodCheckout,
)

export const useAddCart = globalAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session
    return db.cartPenukaran.addCart(session.user.id, data.id_cart, data.berat)
  },
  zod$({ id_cart: z.number(), berat: z.number() }),
)

// DELETE ----------------
export const useDeleteTransaksi = globalAction$(
  async (data) => {
    return await db.profile.deleteOne(Number(data.id))
  },
  zod$({ id: z.string() }),
)

export const useDeleteCart = globalAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session
    const res = await db.cartPenukaran.deleteCart(
      session.user.id,
      Number(data.id_cartList),
    )
    return res
  },
  zod$({ id_cartList: z.number() }),
)
