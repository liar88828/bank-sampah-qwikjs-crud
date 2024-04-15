import {
  RequestHandler,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { prisma } from "~/config/prisma";
import { TSearchData, material } from "~/db/material";
import { user } from "~/db/users";

export const useMaterialSelect = routeLoader$(async ({ params }) => {
  const jenis = await prisma.material.groupBy({
    by: "jenis",
    _sum: {
      berat: true,
    },
    _count: {
      jenis: true,
    },
  });

  // const jumlah=await prisma.material.count({
  // })
  return {
    jenisMaterial: jenis,
    // jumlahMaterial: jumlah,
  };
});
export const onRequest: RequestHandler = async ({ json, query, sharedMap }) => {
  const nama = query.get("name") || "";
  const page = Number(query.get("page")) || 0;

  const limit = 10;
  const pages = page * 10;

  const res = await user.findSearchPage(nama, pages, limit);
  sharedMap.set("res", res);
};

export const useLoadNasabah = routeLoader$(async ({ url, sharedMap }) => {
  const res = sharedMap.get("res");
  //   console.log(res);

  return "test";
});

export const useLoadMaterial = routeLoader$(async ({ query, resolveValue }) => {
  const selectMaterial = await resolveValue(useMaterialSelect);
  const searchMaterial = await resolveValue(useSearchMaterial);
  const groupMaterial = await resolveValue(useMaterialGroup);

  return {
    loadMaterial: groupMaterial,
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
  const search = sharedMap.get("search")||'';
  const jenis = sharedMap.get("jenis") || "";
  const page = sharedMap.get("page")||0;

  // console.log({ search, jenis, page });

  const res = await prisma.material.findMany({
    where: {
      jenis: { contains: jenis },
      nama: { contains: search },
    },
    take: 100,
    skip: 100 * Number(page),
  });
  return res;
});

export const useMaterialGroup = routeLoader$(
  async ({ query, resolveValue }) => {
    const search: TSearchData = {
      jenis: query.get("jenis") || "",
      nama: query.get("nama") || "",
    };

    return material.findGroup(search);
  },
);
