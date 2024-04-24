import { Resource, component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { TimeLine } from "~/components/basic/TimeLine";
import { DetailOnly } from "~/components/card/Material/DetailOnly";
import { material } from "~/db/material";
import { DataMaterial } from "~/type/material.type";

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  console.log(params);
  const res = await material.findId_Relations(Number(params.id_material));
  return res as DataMaterial;
});

export default component$(() => {
  return (
    <div class="container space-y-2 ">
      <Heads/>
      <div class=" card-compact card static bg-base-100">
        <div class="card-body">
          <h1 class="card-title">Process Transaksi</h1>
          <div class="flex justify-center">
            <TimeLine />
          </div>
        </div>
      </div>

      <div class=" card-compact card static bg-base-100">
        <div class="card-body">
          {/* <h1 class="card-title">Material</h1> */}
          <CardMaterialDetail />
        </div>
      </div>
    </div>
  );
});

export const CardMaterialDetail = component$(() => {
  const loadData = useLoadMaterialId();

  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => <DetailOnly data={data} />}
    />
  );
});


export const Heads = component$(() => {
  return (
    <>
      <Link class="btn btn-warning btn-xs" href="/user/profile">
        Back
      </Link>
      <Breadcrumbs
        data={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Profile",
            link: "/user/profile/",
          },
          {
            name: "Edit",
            link: "/user/profile/edit",
          },
        ]}
      />
    </>
  );
});
