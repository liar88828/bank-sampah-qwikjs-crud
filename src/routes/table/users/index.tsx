import { component$ } from "@builder.io/qwik"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import { TableIndexUser } from "~/components/page/user/table-index-user"
import { routeLoader$ } from "@builder.io/qwik-city"
import { type Session } from "@auth/core/types"

export const useGetUsers = routeLoader$(async ({ sharedMap, query }) => {
  const session = sharedMap.get("session") as Session

  return db.users.findAllAdmin(
    control.table.pagination<number>(
      Number(session?.user?.id),
      query.get("page"),
      query.get("search"),
    ),
  )
})

export default component$(() => {
  const usersData = useGetUsers()
  return <TableIndexUser data={usersData.value} />
})
