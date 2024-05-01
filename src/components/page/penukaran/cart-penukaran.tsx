import { $, component$ } from "@builder.io/qwik"
import { useDeleteCart, useCheckOutPenukaran } from "~/action/penukaran.action"
import { CartTrolly } from "~/components/page/global/CartTrolly"
import { control } from "~/controller/controller"
import { type TCheckoutAction } from "~/type/controller/TCheckOut"
import { type PropsCart } from "~/type/db/cart.type"

export const CartPenukaran = component$(
  ({ data, totalBerat, totalCart, totalHarga }: PropsCart) => {
    const dataDelete = useDeleteCart()
    const dataCheckOut = useCheckOutPenukaran()

    const handlerDelete = $(async (id: number) => {
      await dataDelete.submit({ id_cartList: id })
    })

    const handlerCheckOut = $(async (newData: TCheckoutAction) => {
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
