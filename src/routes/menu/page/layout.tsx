import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { prisma } from "~/config/prisma";
import { material } from "~/db/material";
import { TSearchData } from "~/type/material.type";

import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="container">
      <Slot />
    </div>
  );
});

// ------------- Material
export const useLoadMaterial = routeLoader$(async ({ resolveValue }) => {
  const selectMaterial = await resolveValue(useSelectMaterial);
  const searchMaterial = await resolveValue(useSearchMaterial);

  return {
    searchMaterial: searchMaterial,
    selectMaterial: selectMaterial,
  };
});

export const useActionMaterial = routeAction$(
  async (_data, { sharedMap }) => {
    const search = _data.search ?? "";
    const jenis = _data.jenis ?? "";
    const page = _data.page ?? 0;

    sharedMap.set("search", search || "");
    sharedMap.set("jenis", jenis || "");
    sharedMap.set("page", page);

    // console.log({ search, jenis, page });
    return { search, jenis, page };
  },
  zod$({
    search: z.string().optional(),
    jenis: z.string().optional(),
    page: z.number().optional(),
  }),
);

export const useSearchMaterial = routeLoader$(async ({ sharedMap }) => {
  const search = sharedMap.get("search") || "";
  const jenis = sharedMap.get("jenis") || "";
  const page = sharedMap.get("page") || 0;
  // console.log({ search, jenis, page });
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

export const useActionNasabah = routeAction$(
  async (_data, { sharedMap }) => {
    const search = _data.search ?? "";
    const page = _data.page ?? 0;

    sharedMap.set("search_nasabah", search || "");
    sharedMap.set("page_nasabah", page);

    return { search, page };
  },
  zod$({
    search: z.string().optional(),
    page: z.number().optional(),
  }),
);

export const useSelectMaterial = routeLoader$(async ({}) => {
  return prisma.material.groupBy({
    by: "jenis",
    _sum: {
      berat: true,
    },
    _count: {
      jenis: true,
    },
  });
});

export const useSearchNasabah = routeLoader$(async ({ sharedMap }) => {
  const search = sharedMap.get("search_nasabah") || "";
  const page = sharedMap.get("page_nasabah") || 0;

  return prisma.user.findMany({
    where: {
      nama: { contains: search },
    },
    take: 100,
    skip: 100 * Number(page),
  });
});
