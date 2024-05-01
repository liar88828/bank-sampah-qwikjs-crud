import { routeLoader$ } from "@builder.io/qwik-city"
import { db } from "~/db/db"
import { menu } from "~/db/menu/menu"

export const useSelectMaterialUser = routeLoader$(async ({ params }) => {
  const id = params.id_user
  return menu.findMaterialUser(id)
})

export const useSearchMaterialUser = routeLoader$(
  async ({ sharedMap, params }) => {
    const search = sharedMap.get("search") || ""
    const jenis = sharedMap.get("jenis") || ""
    const page = sharedMap.get("page") || 0

    const id = params.id_user

    return menu.findSearchPageUser(id, jenis, search, Number(page))
  },
)

export const useLoadUserId = routeLoader$(async ({ params }) => {
  return db.users.findId(params["id_user"])
})

export const useLoadMaterialUser = routeLoader$(async ({ resolveValue }) => {
  return {
    material: await resolveValue(useSearchMaterialUser),
    select: await resolveValue(useSelectMaterialUser),
  }
})
