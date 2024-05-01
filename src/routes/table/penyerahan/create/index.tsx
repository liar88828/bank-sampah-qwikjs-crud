import { component$ } from "@builder.io/qwik"
import { TablesCreatePenyerahan } from "~/components/page/penyerahan/table-create-penyerahan"
import { CartPenyerahan } from "~/components/page/penyerahan/cart-penyerahan"
import { routeLoader$ } from "@builder.io/qwik-city"
import { type Session } from "@auth/core/types"
import { control } from "~/controller/controller"
import { db } from "~/db/db"

export const useFindCartTrolly = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session") as Session
  return db.cartPenyerahan.findCartTrolly(session.user.id)
})

export const useLoadCartPenyerahan = routeLoader$(
  async ({ sharedMap, query }) => {
    const session = sharedMap.get("session") as Session
    return db.cartPenyerahan.findCartTable(
      control.table.pagination<string>(
        session?.user?.id,
        query.get("page"),
        query.get("search"),
      ),
    )
  },
)
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
