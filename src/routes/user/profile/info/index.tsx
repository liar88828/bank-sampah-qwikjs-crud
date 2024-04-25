import { Session } from "@auth/core/types";
import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { TotalMaterial } from "~/components/penyerahan-sampah/table/TotalMaterial";
import { TransaksiSampah } from "~/components/penyerahan-sampah/table/TransaksiSampah";
import { works } from "~/db/work/work";
import {
  TotalMaterialProps,
  TransaksiSampahProps,
} from "~/type/penyerahan-sampah.type";

export const useGetTransaksi = routeLoader$(
  async ({ resolveValue, sharedMap }) => {
    const session = sharedMap.get("session") as Session;
    const transaksi = await works
      .transaksi()
      .findUserId_Material_Status_Opsi(Number(session?.user?.id));
    const totalTransaksiSampah = transaksi.map((d) => d.opsi_Penukaran);
    const totalMaterial = transaksi.flatMap((d) => d?.Material);
    return {
      transaksi,
      totalTransaksiSampah,
      totalMaterial,
    };
  },
);

export const useGetPenukaran = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session;
  return works.riwayatPertukaran().riwayatPenukaran(Number(session.user.id));
});

export const useResolveAll = routeLoader$(async ({ resolveValue }) => {
  const transaksi = await resolveValue(useGetTransaksi);
  const penukaran = await resolveValue(useGetPenukaran);
  return { ...transaksi, penukaran };
});

export default component$(() => {
  return (
    <section class=" container space-y-3">
      {/* //  class=" rounded bg-base-100 p-5" */}
      <Heads />
      <Tables />
    </section>
  );
});

export const Tables = component$(() => {
  const dataLoad = useResolveAll();

  return (
    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => (
        <div class="grid-rows-1 sm:grid  sm:space-y-5 ">
          <div class="row-span-1 ">
            <div class="space-y-5">
              {/* <RiwayatTransaksi data={data.penukaran} /> */}
              <TransaksiSampah
                data={data.totalTransaksiSampah as TransaksiSampahProps}
              />
              <TotalMaterial data={data.totalMaterial as TotalMaterialProps} />
            </div>
          </div>
        </div>
      )}
    />
  );
});
export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Info")} />;
});

// [
//   {
//     name: "Home",
//     link: "/",
//   },
//   {
//     name: "Profile",
//     link: "/user/profile/",
//   },
//   {
//     name: "Info",
//     link: "/user/profile/info",
//   },
// ]
