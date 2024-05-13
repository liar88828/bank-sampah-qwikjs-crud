import { Slot, component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { TimeLineTutorial } from "../../../components/page/tutorial/TimeLineTutorial"
import { FootStep } from "../../../components/page/tutorial/FootStep"
import { type Session } from "@auth/core/types"
import { listTutorial } from "~/assets/tutorial.list"
import { MaterialTableIndex } from "~/components/page/material/table/table-material"
import { db } from "~/db/db"
export const useLoaderData = routeLoader$(({ query }) => {
  return control.table.tutorial(query, listTutorial["material"])
})

export const useLoadUserMaterial = routeLoader$(async (req) => {
  return db.profile.findMaterialTransaksi(control.table.pagination(req))
})

export const useDataUser = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session
  return control.user.point(session)
})
export default component$(() => {
  return (
    <section class="container  space-y-5">
      <Head />
      <Slot />
    </section>
  )
})

export const Head = component$(() => {
  const loadData = useLoaderData()
  return <TimeLineTutorial data={loadData.value} />
})

export const Foot = component$(() => {
  const loadData = useLoaderData()
  return <FootStep data={loadData.value} />
})
export const ComponentTable = component$(() => {
  const dataLoad = useLoadUserMaterial()
  return <MaterialTableIndex data={dataLoad.value} />
})
