import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import { type MaterialSearchOther } from "~/db/menu/material"

export const useSelectMaterialUser = routeLoader$(async ({ params }) => {
  const id = params.id_user
  return db.menu.findMaterialUser(id)
})

export const useSearchMaterialUser = routeLoader$(async (req) => {
  // const search = sharedMap.get("search") || ""
  // const page = sharedMap.get("page") || 0

  return db.menu.findSearchPageUser(
    control.table.pagination<MaterialSearchOther>(req, {
      jenis: req.sharedMap.get("jenis") || "",
      id_user: req.params.id_user,
    }),
  )
})

export const useLoadUserId = routeLoader$(async ({ params }) => {
  return db.users.findId(params["id_user"])
})

export const useLoadMaterialUser = routeLoader$(async ({ resolveValue }) => {
  return {
    material: await resolveValue(useSearchMaterialUser),
    select: await resolveValue(useSelectMaterialUser),
  }
})
