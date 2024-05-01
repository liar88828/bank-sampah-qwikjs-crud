// import { $, component$ } from "@builder.io/qwik"
// import { CartTrolly } from "~/components/page/global/CartTrolly"
// import {
//   useCheckOutPenyerahan,
//   useDeleteCartPenyerahan,
// } from "~/action/penyerahan.action"
// import { type TCheckoutAction } from "~/type/controller/TCheckOut"
// import { control } from "~/controller/controller"
// import { useFindCartPenyerahan } from "../layout"

// export const Cart = component$(() => {
//   const loadCart = useFindCartPenyerahan()
//   const dataDelete = useDeleteCartPenyerahan()
//   const dataCheckOut = useCheckOutPenyerahan()

//   const handlerDelete = $(async (id: number) => {
//     await dataDelete.submit({ id_cartList: id })
//   })

//   const handlerCheckOut = $(async (newData: TCheckoutAction) => {
//     await dataCheckOut.submit(control.CheckoutAction(newData))
//   })
//   const { data, totalBerat, totalCart, totalHarga } = loadCart.value

//   if (!data) return <h1>Kosong</h1>

//   const loading = dataDelete.isRunning

//   return (
//     <CartTrolly
//       data={data}
//       handlerCheckOut={handlerCheckOut}
//       handlerDelete={handlerDelete}
//       loading={loading}
//       totalBerat={totalBerat}
//       totalCart={totalCart}
//       totalHarga={totalHarga}
//     />
//   )
// })
