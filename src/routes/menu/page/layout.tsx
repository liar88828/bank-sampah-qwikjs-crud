import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { material } from "~/db/material/material";
import { TSearchData } from "~/type/material.type";

import { ZSearchComponent } from "./zod/ZSearchComponent";
import { userSearch } from "./prisma/userSearch";
import { materialGroup } from "./prisma/userSearch";
import { ZSearchNasabah } from "./zod/ZSearchComponent";

// ------------- Material
export const useLoadMaterial = routeLoader$(async ({ resolveValue }) => {
  const selectMaterial = await resolveValue(useSelectMaterial);
  const searchMaterial = await resolveValue(useSearchMaterial);

  return {
    searchMaterial: searchMaterial,
    selectMaterial: selectMaterial,
  };
});

export const useActionMaterial = routeAction$(async (_data, { sharedMap }) => {
  const search = _data.search ?? "";
  const jenis = _data.jenis ?? "";
  const page = _data.page ?? 0;

  sharedMap.set("search", search || "");
  sharedMap.set("jenis", jenis || "");
  sharedMap.set("page", page);

  // console.log({ search, jenis, page });
  return { search, jenis, page };
}, ZSearchComponent);

export const useSearchMaterial = routeLoader$(async ({ sharedMap }) => {
  const search = sharedMap.get("search") || "";
  const jenis = sharedMap.get("jenis") || "";
  const page = sharedMap.get("page") || 0;
  return material.findSearchPage(jenis, search, Number(page));
});

export const useGroupMaterial = routeLoader$(
  async ({ query, resolveValue }) => {
    const search: TSearchData = {
      jenis: query.get("jenis") || "",
      nama: query.get("nama") || "",
    };

    return material.findGroup(search);
  },
);
// ------------- nasabah

export const useLoadNasabah = routeLoader$(async ({ resolveValue }) => {
  const searchNasabah = await resolveValue(useSearchNasabah);

  return { searchNasabah };
});

export const useActionNasabah = routeAction$(async (_data, { sharedMap }) => {
  const search = _data.search ?? "";
  const page = _data.page ?? 0;

  sharedMap.set("search_nasabah", search || "");
  sharedMap.set("page_nasabah", page);

  return { search, page };
}, ZSearchNasabah);

export const useSelectMaterial = routeLoader$(async () => {
  return materialGroup()
});

export const useSearchNasabah = routeLoader$(async ({ sharedMap }) => {
  const search = sharedMap.get("search_nasabah") || "";
  const page = sharedMap.get("page_nasabah") || 0;

  return userSearch(search, page);
});
