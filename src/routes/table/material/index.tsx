import { MaterialTableIndex } from "~/components/page/material/table/table-material"
import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { db } from "~/db/db"

export const useLoadUserMaterial = routeLoader$(async (req) => {
  return db.profile.findMaterialTransaksi(control.table.pagination(req))
})

export default component$(() => {
  const dataLoad = useLoadUserMaterial()
  return <MaterialTableIndex data={dataLoad.value} />
})
