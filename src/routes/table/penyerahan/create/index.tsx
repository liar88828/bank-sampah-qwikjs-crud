import { component$ } from "@builder.io/qwik"
import { TablesCreatePenyerahan } from "~/components/page/penyerahan/table-create-penyerahan"
import { CartPenyerahan } from "~/components/page/penyerahan/cart-penyerahan"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import { auth } from "~/controller/auth"

export const useFindCartTrolly = routeLoader$(async (req) => {
  return db.cartPenyerahan.findCartTrolly(auth.userId(req))
})

export const useLoadCartPenyerahan = routeLoader$(async (req) => {
  return db.cartPenyerahan.findCartTable(control.table.pagination(req))
})

export default component$(() => {
  const loadCart = useFindCartTrolly()
  const dataLoad = useLoadCartPenyerahan()
  return (
    <div class="  md:grid md:grid-cols-3">
      <div class="col-span-2 bg-base-100">
        <TablesCreatePenyerahan data={dataLoad.value} />
      </div>
      <div class="col-span-1  bg-base-200">
        <CartPenyerahan {...loadCart.value} />
      </div>
    </div>
  )
})
