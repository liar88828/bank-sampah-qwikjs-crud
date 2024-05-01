// import { $, component$ } from "@builder.io/qwik"
// import { useLoadCartPenyerahan } from "../layout"
// import { useAddCartPenyerahan } from "~/action/penyerahan.action"
// import { TableComponent } from "./TableComponent"

// export const Tables = component$(() => {
//   const dataLoad = useLoadCartPenyerahan()
//   const dataAdd = useAddCartPenyerahan()

//   const handlerAdd = $(async (id: number) => {
//     await dataAdd.submit({
//       id_cart: id,

//       berat: 0,
//     })
//   })
//   const loading = dataAdd.isRunning

//   return (
//     <TableComponent
//       data={dataLoad.value}
//       handlerAdd={handlerAdd}
//       href="/user/penyerahan/create/"
//       loading={loading}
//     />
//   )
// })
