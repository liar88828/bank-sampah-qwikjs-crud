import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { DetailTransaksi } from "~/components/card/Material/DetailTransaksi";
import { material } from "~/db/material";
import { findMaterial_User } from "../../prisma/userSearch";

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  return material.findId_Relations(Number(params.id_material));
});

export const useActionMaterialBeli = routeAction$(
  async (_data, { sharedMap, params }) => {
    const id = Number(params.id_material);
    const jumlah = Number(_data.jumlah);
    return findMaterial_User(id, jumlah);
  },
  zod$({
    jumlah: z.string(),
  }),
);

export default component$(() => {
  return (
    <div class="container space-y-5">
      <Breadcrumbs data={getBreadcrumbTrail("Material-Detail")} />
      <DetailTransaksi />
    </div>
  );
});
