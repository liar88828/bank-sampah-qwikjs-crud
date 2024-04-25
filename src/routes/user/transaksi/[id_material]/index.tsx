import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { TimeLine } from "~/components/basic/TimeLine";
import { DetailOnly } from "~/components/card/Material/DetailOnly";
import { material } from "~/db/material";
import { DataMaterial } from "~/type/material.type";

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  const res = await material.findId_Relations(Number(params.id_material));
  // console.log(res);
  return res as DataMaterial;
});

export default component$(() => {
  return (
    <div class="container space-y-2 ">
      <Heads />

      <div class=" card card-compact static bg-base-100">
        <div class="card-body">
          <h1 class="card-title">Process Transaksi</h1>
          <div class="flex justify-center">
            <TimeLine />
          </div>
        </div>
      </div>

      {/* <h1 class="card-title">Material</h1> */}
      <DetailOnlyComponent />
    </div>
  );
});

export const Heads = component$(() => {
  const location = useLocation();
  const params = location.params.id_material;

  return (
    <>
      {/* <Link class="btn btn-warning " href="/user/profile">
        Back
      </Link> */}

      <Breadcrumbs data={getBreadcrumbTrail("Transaksi")} />
    </>
  );
});

export const DetailOnlyComponent = component$(() => {
  const loadData = useLoadMaterialId();
  return (
    <div class=" card-compact card static bg-base-100">
      <div class="card-body">
        <Resource
          value={loadData}
          onPending={() => <span class="loading loading-spinner"></span>}
          onRejected={() => <span>Error</span>}
          onResolved={(data) => {
            return <DetailOnly data={data} />;
          }}
        />
      </div>
    </div>
  );
});
