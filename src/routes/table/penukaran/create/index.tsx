import { component$ } from "@builder.io/qwik"
import { TablesCreatePenukaran } from "~/components/page/penukaran/table/table-create-penukaran"
import { CartPenukaran } from "~/components/page/penukaran/cart-penukaran"

import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"
import { db } from "~/db/db"

export const useFindCartTrolly = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session") as Session
  return db.cartPenyerahan.findCartTrolly(session.user.id)
})

export const useLoadCartPenukaranItem = routeLoader$(async (req) => {
  return db.cartPenukaran.findCartTable(control.table.pagination(req))
})

export default component$(() => {
  const loadCart = useFindCartTrolly()
  const dataLoad = useLoadCartPenukaranItem()

  return (
    <div class="  md:grid md:grid-cols-3">
      <div class="col-span-2 bg-base-100">
        <TablesCreatePenukaran data={dataLoad.value} />
      </div>
      <div class="col-span-1  bg-base-200">
        <CartPenukaran {...loadCart.value} />
      </div>
    </div>
  )
})
