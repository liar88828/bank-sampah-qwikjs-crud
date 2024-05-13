import { Slot, component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { FootStep } from "~/components/page/tutorial/FootStep"
import { TimeLineTutorial } from "~/components/page/tutorial/TimeLineTutorial"
import { listTutorial } from "~/assets/tutorial.list"
import { TablesCreatePenukaran } from "~/components/page/penukaran/table/table-create-penukaran"
import { CartPenukaran } from "~/components/page/penukaran/cart-penukaran"
import { TablesIndexPenukaran } from "~/components/page/penukaran/table/table-index-penukaran"
import { db } from "~/db/db"
import { type Session } from "@auth/core/types"

export const useLoaderTimeLine = routeLoader$(({ query }) => {
  return control.table.tutorial(query, listTutorial["penukaran"])
})

export const useDataUser = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session
  return control.user.point(session)
})

export const useLoadUserMaterial = routeLoader$(async (req) => {
  return db.profile.findMaterialTransaksi(control.table.pagination(req))
})

// ----------------

export const Head = component$(() => {
  const loadData = useLoaderTimeLine()
  return <TimeLineTutorial data={loadData.value} />
})

export const Foot = component$(() => {
  const loadData = useLoaderTimeLine()
  return <FootStep data={loadData.value} />
})

export const useLoadCartPenukaran = routeLoader$(async (req) => {
  return db.cartPenukaran.findCartTable(control.table.pagination(req))
})

export const useFindCartPenukaran = routeLoader$(async ({ sharedMap }) => {
  const session: Session = sharedMap.get("session") as Session
  return db.cartPenukaran.findCartTrolly(session.user.id)
})

export const useLoadPenukaran = routeLoader$(async (req) => {
  return db.cartPenukaran.findTransaksi(control.table.pagination(req))
})

export default component$(() => {
  return (
    <section class="container space-y-5">
      <Head />
      <Slot />
    </section>
  )
})

export const TablePenukaran = component$(() => {
  const data = useLoadPenukaran()
  return (
    <TablesIndexPenukaran
      data={data.value}
      link={{
        page: "/table/penukaran/",
      }}
    />
  )
})

export const CreatePenukaranComponent = component$(() => {
  const loadCart = useFindCartPenukaran()
  const dataLoad = useLoadCartPenukaran()

  return (
    <section class="  space-y-3">
      {/* <Heads title="Penukaran" /> */}
      <div class="  md:grid md:grid-cols-3">
        <div class="col-span-2 bg-base-100">
          <TablesCreatePenukaran data={dataLoad.value} />
        </div>
        <div class="col-span-1  bg-base-200">
          <CartPenukaran {...loadCart.value} />
        </div>
      </div>
    </section>
  )
})
