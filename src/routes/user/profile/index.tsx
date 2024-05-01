import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { ProfileIndex } from "~/components/page/profile/ComponentProfile"
import { control } from "~/controller/controller"
import { type Session } from "@auth/core/types"
import { type PropsProfileLoader } from "~/type/pages/user.type"

export const useDataUser = routeLoader$(async ({ sharedMap, fail }) => {
  const session = sharedMap.get("session") as Session

  const res = await control.user.point(session)
  if (!res) {
    // Return a failed value to indicate that product was not found
    return fail(404, {
      errorMessage: "not found",
    })
  }
  return res
})

export default component$(() => {
  const { value } = useDataUser()

  if (value.errorMessage) {
    // Render UI for failed value
    return <div>{value.errorMessage}</div>
  }

  return (
    <ProfileIndex
      data={
        {
          ...value,
        } as PropsProfileLoader
      }
    />
  )
})
