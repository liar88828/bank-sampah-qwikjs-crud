import { Slot, component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { FootStep } from "~/components/page/tutorial/FootStep"
import { TimeLineTutorial } from "~/components/page/tutorial/TimeLineTutorial"
import { listTutorial } from "~/assets/tutorial.list"
import { CartPenyerahan } from "~/components/page/penyerahan/cart-penyerahan"
import { TablesCreatePenyerahan } from "~/components/page/penyerahan/table-create-penyerahan"
import { TableIndexPenyerahan } from "~/components/page/penyerahan/table/table-index-penyerahan"
import { type Session } from "@auth/core/types"
import { db } from "~/db/db"
export const useLoaderTimeLine = routeLoader$(({ query }) => {
  return control.table.tutorial(query, listTutorial["penyerahan"])
})

export const useDataUser = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session
  return control.user.point(session)
})

export const useLoadUserMaterial = routeLoader$(async (req) => {
  return db.profile.findMaterialTransaksi(control.table.pagination(req))
})

// ------------penyerangan sampah
export const useLoadPenyerahan = routeLoader$(async (req) => {
  return db.cartPenyerahan.findTransaksi(control.table.pagination<string>(req))
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

// -------create Penyerahan

export const useLoadCartPenyerahan = routeLoader$(async (req) => {
  return db.cartPenyerahan.findCartTable(control.table.pagination(req))
})
export const useFindCartPenyerahan = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session
  return db.cartPenyerahan.findCartTrolly(session.user.id)
})

export default component$(() => {
  return (
    <section class="container space-y-5">
      <Head />
      <Slot />
    </section>
  )
})

export const TablePenyerahan = component$(() => {
  const data = useLoadPenyerahan()
  return (
    <TableIndexPenyerahan
      data={data.value}
      link={{
        page: "/table/penyerahan/",
      }}
    />
  )
})

export const CreatePenyerahanComponent = component$(() => {
  const loadCart = useFindCartPenyerahan()
  const dataLoad = useLoadCartPenyerahan()
  return (
    <section class="space-y-3">
      <div class="md:grid md:grid-cols-3">
        <div class="col-span-2 bg-base-100">
          <TablesCreatePenyerahan data={dataLoad.value} />
        </div>
        <div class="col-span-1  bg-base-200">
          <CartPenyerahan {...loadCart.value} />
        </div>
      </div>
    </section>
  )
})
