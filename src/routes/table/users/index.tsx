import { component$ } from "@builder.io/qwik"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import { TableIndexUser } from "~/components/page/user/table-index-user"
import { routeLoader$ } from "@builder.io/qwik-city"

export const useGetUsers = routeLoader$(async (req) => {
  // <number>
  return db.users.findAllAdmin(control.table.pagination(req))
})

export default component$(() => {
  const usersData = useGetUsers()
  return <TableIndexUser data={usersData.value} />
})
