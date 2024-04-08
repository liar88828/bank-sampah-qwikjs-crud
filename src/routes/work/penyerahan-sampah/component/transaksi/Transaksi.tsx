import { component$, Resource } from "@builder.io/qwik";
import { useGetTransaksiSampah } from "../../layout";
import {
  ProfileProps,
  TotalMaterialProps,
  TransaksiSampahProps,
} from "../../../type/penyerahan-sampah.type";
import { TotalMaterial } from "./TotalMaterial";
import { TransaksiSampah } from "./TransaksiSampah";

export const Transaksi = component$(({ data }: { data: ProfileProps }) => {
  const dataLoad = useGetTransaksiSampah();

  return (

    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        return (
          <div class="rounded-t-lg sm:rounded-lg bg-white p-5 sm:shadow ">
            <div class="space-y-5">
              <TransaksiSampah
                data={data.totalTransaksiSampah as TransaksiSampahProps}
              />
              <TotalMaterial
                data={data.totalMaterial as TotalMaterialProps}
              />
            </div>
          </div>
        );
      }}
    />

  );
});


