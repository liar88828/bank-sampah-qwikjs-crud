import { component$, Resource } from "@builder.io/qwik";
import { useGetTransaksiSampah } from "../../routes/work/penyerahan-sampah/layout";
import {
  ProfileProps,
  TotalMaterialProps,
  TransaksiSampahProps,
} from "../../type/penyerahan-sampah.type";
import { TotalMaterial } from "./table/TotalMaterial";
import { TransaksiSampah } from "./table/TransaksiSampah";

export const Transaksi = component$(({ data }: { data: ProfileProps }) => {
  const dataLoad = useGetTransaksiSampah();

  return (
    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        return (
          <div class="space-y-5">
            <TransaksiSampah
              data={data.totalTransaksiSampah as TransaksiSampahProps}
            />
            <TotalMaterial data={data.totalMaterial as TotalMaterialProps} />
          </div>
        );
      }}
    />
  );
});
