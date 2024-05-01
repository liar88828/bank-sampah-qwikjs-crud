import { routeLoader$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { menu } from "~/db/menu/menu"
import type {
  TSearchData,
  MaterialLoader,
  NasabahLoader,
} from "~/type/db/menu.type"

// ------------- Material
export const useLoadMaterial = routeLoader$(async ({ resolveValue }) => {
  return {
    searchMaterial: await resolveValue(useSearchMaterial),
    selectMaterial: await menu.KategoriMaterial(),
  } as MaterialLoader
})

export const useSearchMaterial = routeLoader$(async ({ sharedMap }) => {
  return menu.findSearchPage(
    control.table.pagination(
      sharedMap.get("jenis") || "",
      sharedMap.get("page") || 0,
      sharedMap.get("search") || "",
    ),
  )
})

export const useGroupMaterial = routeLoader$(async ({ query }) => {
  return menu.findGroup({
    jenis: query.get("jenis") ?? "",
    nama: query.get("nama") ?? "",
  } as TSearchData)
})

// ------------- nasabah

export const useLoadNasabah = routeLoader$(async ({ resolveValue }) => {
  const searchNasabah = await resolveValue(useSearchNasabah)

  return { searchNasabah } as NasabahLoader
})

export const useSearchNasabah = routeLoader$(async ({ sharedMap }) => {
  return menu.userSearch(
    control.table.pagination(
      "",
      sharedMap.get("page_nasabah") || 0,
      sharedMap.get("search_nasabah") || "",
    ),
  )
})
