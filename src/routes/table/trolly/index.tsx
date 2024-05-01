/* eslint-disable prefer-const */
import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"
import { TableTrollyIndex } from "~/components/page/trolly/table-index-trolly"
import { db } from "~/db/db"

export const useLoadTrolly = routeLoader$(async ({ sharedMap, query }) => {
  const session: Session = sharedMap.get("session")

  return db.profile.findTrolly(
    control.table.pagination(
      session?.user?.id,
      query.get("page"),
      query.get("search"),
    ),
  )
})

export default component$(() => {
  const loadData = useLoadTrolly()
  return <TableTrollyIndex data={loadData.value} />
})


