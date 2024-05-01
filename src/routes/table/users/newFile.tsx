import { component$ } from "@builder.io/qwik"
import { useGetUsers } from "."
import { TableIndexUser } from "../../../components/page/user/table-index-user"

export default component$(() => {
  const usersData = useGetUsers()
  return <TableIndexUser data={usersData.value} />
})
