import { component$, Resource } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { getDate } from "~/lib/date";
import {
  useGetTransaksi,
  useLoadPenyerahan,
} from "./layout";
import { ProfileProps } from "../type/penyerahan-sampah.type";
import { Profile } from "./component/Profile";
import { Transaksi } from "./component/transaksi/Transaksi";
import { Riwayat } from "./component/Riwayat";

export default component$(() => {
  const dataLoad = useLoadPenyerahan();

  return (
    <section class="container rounded bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>User Profile</h1>
        <Link class="btn btn-info " href="create">
          Penyerahan Sampah
        </Link>
      </div>

      <Resource
        value={dataLoad}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => (
          <div class="grid grid-rows-1 gap-5">
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

            <div class="row-span-1 ">
              <Riwayat  />
            </div>
          </div>
        )}
      />
    </section>
  );
});


