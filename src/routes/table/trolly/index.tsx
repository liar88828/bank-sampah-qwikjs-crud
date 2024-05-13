/* eslint-disable prefer-const */
import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { TableTrollyIndex } from "~/components/page/trolly/table-index-trolly"
import { db } from "~/db/db"

export const useLoadTrolly = routeLoader$(async (req) => {
  return db.profile.findTrolly(control.table.pagination(req))
})

export default component$(() => {
  const loadData = useLoadTrolly()
  return <TableTrollyIndex data={loadData.value} />
})
