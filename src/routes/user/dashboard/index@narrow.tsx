import { type Session } from "@auth/core/types"
import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Dashboard } from "~/components/page/dashboard/Dashboard"
import { db } from "~/db/db"

export const useDashboard = routeLoader$(async ({ sharedMap }) => {
  const session: Session = sharedMap.get("session")
  return db.dashboard.resolveAll(session.user.id)
})

export default component$(() => {
  const dataLoad = useDashboard()
  // console.log(dataLoad.value)

  // dataLoad.value.user
  return <Dashboard data={dataLoad.value} />
})
