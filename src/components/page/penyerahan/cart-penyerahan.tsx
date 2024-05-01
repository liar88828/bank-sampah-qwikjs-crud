import { $, component$ } from "@builder.io/qwik"
import {
  useCheckOutPenyerahan,
  useDeleteCartPenyerahan,
} from "~/action/penyerahan.action"
import { CartTrolly } from "~/components/page/global/CartTrolly"
import { control } from "~/controller/controller"

import { type TCheckoutAction } from "~/type/controller/TCheckOut"
import { type PropsCart } from "~/type/db/cart.type"

export const CartPenyerahan = component$(
  ({ data, totalBerat, totalCart, totalHarga }: PropsCart) => {
    const dataDelete = useDeleteCartPenyerahan()
    const dataCheckOut = useCheckOutPenyerahan()

    const handlerDelete = $(async (id: number) => {
      await dataDelete.submit({ id_cartList: id })
    })

    const handlerCheckOut = $(async (newData: TCheckoutAction) => {
      console.info("handler : handlerCheckOut", newData)
      await dataCheckOut.submit(control.cart.sanitize(newData))
    })

    if (!data) return <h1>Kosong</h1>
    const loading = dataDelete.isRunning

    return (
      <CartTrolly
        data={data}
        totalBerat={totalBerat}
        totalCart={totalCart}
        totalHarga={totalHarga}
        handlerCheckOut={handlerCheckOut}
        handlerDelete={handlerDelete}
        loading={loading}
      />
    )
  },
)
