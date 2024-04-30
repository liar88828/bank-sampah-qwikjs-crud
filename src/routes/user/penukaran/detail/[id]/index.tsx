import { Resource, component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import {
  PropsStatus,
  TimeLine,
  getStatusObject,
} from "~/components/basic/TimeLine";
import { Spinner } from "~/components/loading/spinner";
import { trolly } from "~/db/join/cart/trolly";

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  const res = await trolly.findPenukaran(Number(params.id));
  return res;
});

export default component$(() => {
  return (
    <div class="container space-y-2 ">
      <Heads />
      <DetailOnlyComponent />
    </div>
  );
});

export const StatusLine = component$(({ status }: { status: PropsStatus }) => {
  return (
    <div class=" card card-compact static bg-base-100">
      <div class="card-body">
        <h1 class="card-title">Process Transaksi</h1>
        <div class="flex justify-center">
          <TimeLine status={getStatusObject(status)} />
        </div>
      </div>
    </div>
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Transaksi")} />;
});

export const DetailOnlyComponent = component$(() => {
  const loadData = useLoadMaterialId();
  return (
    <Resource
      value={loadData}
      onPending={() => <Spinner />}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        console.log(data);

        return (
          <>
            <StatusLine
              status={data?.Transaksi.status_Transaksi?.type as PropsStatus}
            />

            <div class=" card-compact card static bg-base-100">
              <div class="card-body">
                <div class="rounded-lg bg-base-100 p-5 shadow">
                  <div class="gap-5 sm:flex">
                    <h1 class="text-md font-bold sm:text-xl ">
                      Sampah Material
                    </h1>
                  </div>
                  {/* ------ */}
                  <div class="overflow-x-auto">
                    <table class="table table-xs static sm:table-sm md:table-md ">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>id</th>
                          <th>Nama</th>
                          <th>Berat</th>
                          <th>Kategori</th>
                          <th>Status</th>
                          <th>Harga</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.Cases.flatMap((d, i) => (
                          <tr key={d.id}>
                            <td>{i + 1}</td>
                            <td>{d.id}</td>
                            <td>{d.Material?.nama}</td>
                            <td>
                              {d.Material?.berat} {d.Material?.satuan}
                            </td>
                            <td>{d.Material?.kategori}</td>
                            <td>{d.status}</td>
                            <td>{d.Material?.harga}</td>
                            <th>
                              <Link
                                href={`material/${d.id}`}
                                class="btn btn-info btn-xs"
                              >
                                details
                              </Link>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
});
