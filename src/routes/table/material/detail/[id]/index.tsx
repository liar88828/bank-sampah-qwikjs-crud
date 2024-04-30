import { $, Resource, component$, useId } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { OptionsCard } from "~/components/basic/OptionsCard";
import { DetailOnly } from "~/components/card/Material/DetailOnly";
import { material } from "~/db/material/material";
import { DataMaterial } from "~/type/material.type";

export const useGetId = routeLoader$(async ({ params }) => {
  const res = await material.findId_Relations(Number(params.id));
  return res as DataMaterial;
});

export const useDelete = routeAction$(
  async (data, { redirect }) => {
    const res = await material.deleteOne(Number(data.id));
    if (res) {
      throw redirect(302, "/table/material");
    }
    return res;
  },
  zod$({ id: z.number() }),
);

export default component$(() => {
  return (
    <section class="container space-y-2">
      <Heads />
      <Cards />
    </section>
  );
});

export const Cards = component$(() => {
  const loadData = useGetId();
  const deleteMaterial = useDelete();
  const handlerDelete = $(() => {
    deleteMaterial.submit({ id: loadData.value.id });
  });
  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        console.log(data);
        return (
          <DetailOnly data={data}>
            <OptionsCard
              onDelete={handlerDelete}
              onEdit={`/table/material/edit/${loadData.value.id}`}
            />
          </DetailOnly>
        );
      }}
    />
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Material-Detail")} />;
});
