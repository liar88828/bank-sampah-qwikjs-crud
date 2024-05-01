import { MaterialTableIndex } from "~/components/page/material/table/table-material"
import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import { type Session } from "@auth/core/types"

export const useLoadUserMaterial = routeLoader$(
  async ({ sharedMap, query }) => {
    const session = sharedMap.get("session") as Session

    return db.profile.findMaterialTransaksi(
      control.table.pagination(
        session?.user?.id,
        query.get("page"),
        query.get("search"),
      ),
    )
  },
)

export default component$(() => {
  const dataLoad = useLoadUserMaterial()
  return <MaterialTableIndex data={dataLoad.value} />
})
