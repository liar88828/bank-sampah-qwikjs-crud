import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { db } from "~/db/db"
import { type Session } from "@auth/core/types"
import { FormUpdateUser } from "~/components/page/user/form-update-user"
// for admin

export const useGetUserId = routeLoader$(async ({ sharedMap, status }) => {
  const session = sharedMap.get("session") as Session
  const res = await db.users.findUser(session.user.id)

  if (!res) {
    status(404)
  }
  return res
})

export default component$(() => {
  const dataLoad = useGetUserId()
  return <FormUpdateUser data={dataLoad.value} />
})
