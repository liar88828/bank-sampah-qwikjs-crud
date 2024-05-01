import { globalAction$ } from "@builder.io/qwik-city"
import {
  ZSearchComponent,
  ZSearchNasabah,
} from "~/lib/zod/menu/ZSearchComponent"

export const useActionMaterial = globalAction$(async (_data, { sharedMap }) => {
  const search = _data.search ?? ""
  const jenis = _data.jenis ?? ""
  const page = _data.page ?? 0

  sharedMap.set("search", search || "")
  sharedMap.set("jenis", jenis || "")
  sharedMap.set("page", page)

  // console.log({ search, jenis, page });
  return { search, jenis, page }
}, ZSearchComponent)

export const useActionNasabah = globalAction$(async (_data, { sharedMap }) => {
  const search = _data.search ?? ""
  const page = _data.page ?? 0

  sharedMap.set("search_nasabah", search || "")
  sharedMap.set("page_nasabah", page)

  return { search, page }
}, ZSearchNasabah)
