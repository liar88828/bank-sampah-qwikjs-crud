import { component$ } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { DetailTransaksi } from "~/components/card/Material/DetailTransaksi";
import { prisma } from "~/config/prisma";
import { material } from "~/db/material";

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  return material.findId_Relations(Number(params.id_material));
});

export const useActionMaterialBeli = routeAction$(
  async (_data, { sharedMap, params }) => {
    const id = Number(params.id_material);
    const jumlah = Number(_data.jumlah);

    return prisma.$transaction(async (tx) => {
      const material = await tx.material.findUnique({ where: { id } });

      if (!material) {
        return {
          error: "Material not found",
        };
      }
      if (material.berat < jumlah) {
        return {
          error: "Material Berat is Valid",
        };
      }
      const transaksi = await tx.material.update({
        where: { id },
        data: {
          berat: {
            decrement: jumlah,
          },
        },
      });

      return {
        transaksi,
        material,
      };
    });
  },
  zod$({
    jumlah: z.string(),
  }),
);

export default component$(() => {
  // console.log(params.id_material)
  return (
    <div class="container space-y-5">
      <Link href={"/menu/page/"} class="btn btn-warning">
        Back
      </Link>
      <Breadcrumbs
        data={[
          {
            name: "Home",
            link: "/menu/page",
          },
          {
            name: "Material",
            link: "",
          },
          {
            name: "",
            link: ``,
          },
        ]}
      />
      <DetailTransaksi />
    </div>
  );
});
