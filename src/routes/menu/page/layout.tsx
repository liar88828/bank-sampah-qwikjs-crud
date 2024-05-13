import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { db } from "~/db/db"
import type {
  TSearchData,
  MaterialLoader,
  NasabahLoader,
} from "~/type/db/menu.type"

// ------------- Material
export const useLoadMaterial = routeLoader$(async ({ resolveValue }) => {
  return {
    searchMaterial: await resolveValue(useSearchMaterial),
    selectMaterial: await db.menu.KategoriMaterial(),
  } as MaterialLoader
})

export const useSearchMaterial = routeLoader$(async (req) => {
  return db.menu.findSearchPage(control.table.pagination(req))
})

export const useGroupMaterial = routeLoader$(async ({ query }) => {
  return db.menu.findGroup({
    jenis: query.get("jenis") ?? "",
    nama: query.get("nama") ?? "",
  } as TSearchData)
})

// ------------- nasabah

export const useLoadNasabah = routeLoader$(async ({ resolveValue }) => {
  const searchNasabah = await resolveValue(useSearchNasabah)

  return { searchNasabah } as NasabahLoader
})

export const useSearchNasabah = routeLoader$(async (req) => {
  return db.menu.userSearch(
    control.table.pagination(
      // "",
      // sharedMap.get("page_nasabah") || 0,
      // sharedMap.get("search_nasabah") || "",
      req,
    ),
  )
})
