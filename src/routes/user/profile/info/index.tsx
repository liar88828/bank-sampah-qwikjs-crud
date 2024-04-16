import { Session } from "@auth/core/types";
import { component$, Resource } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { RiwayatTransaksi } from "~/components/penyerahan-sampah/table/RiwayatTransaksi";
import { TotalMaterial } from "~/components/penyerahan-sampah/table/TotalMaterial";
import { TransaksiSampah } from "~/components/penyerahan-sampah/table/TransaksiSampah";
import { works } from "~/db/work";
import {
  TotalMaterialProps,
  TransaksiSampahProps,
} from "~/type/penyerahan-sampah.type";

export const useGetTransaksi = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session;
  const transaksi = await works.transaksi(Number(session?.user?.id));
  const totalTransaksiSampah = transaksi.map((d) => d.Sampah_Transaksi);
  const totalMaterial = totalTransaksiSampah.flatMap((d) => d?.Material);
  return {
    transaksi,
    totalTransaksiSampah,
    totalMaterial,
  };
});

export const useGetPenukaran = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session") as Session;
  return works.riwayatPenukaran(Number(session.user.id));
});

export const useResolveAll = routeLoader$(async ({ resolveValue }) => {
  const transaksi = await resolveValue(useGetTransaksi);
  const penukaran = await resolveValue(useGetPenukaran);
  return { ...transaksi, penukaran };
});

export default component$(() => {
  const dataLoad = useResolveAll();
  return (
    <section
      class="space-y-3"
      //  class=" rounded bg-base-100 p-5"
    >
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
            name: "Info",
            link: "/user/profile/info",
          },
        ]}
      />
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
                <TotalMaterial
                  data={data.totalMaterial as TotalMaterialProps}
                />
              </div>
            </div>
          </div>
        )}
      />
    </section>
  );
});
