import { component$, Resource } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useLoadPenyerahan } from "./layout";
import { ProfileProps } from "../../../type/penyerahan-sampah.type";
import { Profile } from "../../../components/penyerahan-sampah/Profile";
import { Transaksi } from "../../../components/penyerahan-sampah/Transaksi";
import { Riwayat } from "../../../components/penyerahan-sampah/table/Riwayat";

export default component$(() => {
  const dataLoad = useLoadPenyerahan();

  return (
    <section class=" container ">
      <Resource
        value={dataLoad}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => (
          <div class="grid-rows-1 sm:grid  sm:space-y-5 ">
            <div class="row-span-1">
              <div class="grid gap-5 sm:grid-cols-3">
                <div class="sm:col-span-1   ">
                  <Profile data={data as ProfileProps} />
                </div>

                <div class="sm:col-span-2   ">
                  <Transaksi data={data as ProfileProps} />
                </div>
              </div>
            </div>

            <div class="row-span-1 mt-5 sm:mt-0">
              <Riwayat />
            </div>
          </div>
        )}
      />
    </section>
  );
});
