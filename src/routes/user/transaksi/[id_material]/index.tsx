import { Resource, component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { TimeLine } from "~/components/basic/TimeLine";
import { DetailOnly } from "~/components/card/Material/DetailOnly";
import { material } from "~/db/material";
import { DataMaterial } from "~/type/material.type";

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  const res = await material.findId_Relations(Number(params.id_material));
  return res as DataMaterial
});

export default component$(() => {
  return (
    <div class="container space-y-2 ">
      <HeadsMenu />

      <div class=" card card-compact static bg-base-100">
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
          <DetailOnlyComponent />
        </div>
      </div>
    </div>
  );
});

export const HeadsMenu = component$(() => {
  const location = useLocation();
  const params = location.params.id_material;

  return (
    <>
      <Link class="btn btn-warning " href="/user/profile">
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
            name: "Transaksi",
            link: "/user/profile/transaksi",
          },
          {
            name: params,
            link: "",
          },
        ]}
      />
    </>
  );
});

export const DetailOnlyComponent = component$(() => {
  const loadData = useLoadMaterialId();
  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        return <DetailOnly data={data} />;
      }}
    />
  );
});
