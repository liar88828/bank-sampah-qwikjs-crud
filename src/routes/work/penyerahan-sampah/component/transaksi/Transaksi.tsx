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
    <div class="rounded-lg bg-white p-5 shadow">
      <div class="space-y-5">
        <Resource
          value={dataLoad}
          onPending={() => <span class="loading loading-spinner"></span>}
          onRejected={() => <span>Error</span>}
          onResolved={(data) => {
            return (
              <>
                <TransaksiSampah
                  data={data.totalTransaksiSampah as TransaksiSampahProps}
                />
                <TotalMaterial
                  data={data.totalMaterial as TotalMaterialProps}
                />
              </>
            );
          }}
        />
      </div>
    </div>
  );
});


