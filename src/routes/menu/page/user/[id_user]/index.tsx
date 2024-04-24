import { Resource, component$, useStore } from "@builder.io/qwik";
import { LuSearch } from "@qwikest/icons/lucide";
import { useLoadMaterialUser, useLoadUserId } from "./layout";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useActionMaterial } from "../../layout";

export default component$(() => {
  const location = useLocation();
  const callback = location.url.searchParams.get("callback") ?? "";
  return (
    <section class="space-y-3">
      <Link href={"/menu/page"} class="btn btn-warning">
        Back
      </Link>
      <ProfileUser />
      <MaterialUser />
    </section>
  );
});

export const ProfileUser = component$(() => {
  const loadData = useLoadUserId();
  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        return (
          <div class="card w-full  bg-base-100">
            <div class="card-body space-y-6">
              <div class="flex items-center space-x-6">
                <div class="relative mr-2 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    class="rounded-full object-cover"
                    height="64"
                    src="https://picsum.photos/200/200"
                    width="64"
                    alt='avatar "Jane Doe"'
                  />
                </div>
                <div class="space-y-1.5">
                  <h1 class="text-2xl font-bold">{data.nama}</h1>
                  <p class="text-gray-500 dark:text-gray-400">{data.email}</p>
                </div>
              </div>
              <div class="space-y-2 text-sm leading-loose md:text-base">
                <p>
                  Product designer passionate about creating beautiful and
                  user-friendly interfaces. Currently working at Acme
                  Corporation.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
                <div class="space-y-2">
                  <h2 class="text-lg font-semibold">Alamat</h2>
                  <p>{data.alamat}</p>
                </div>
                <div class="space-y-2">
                  <h2 class="text-lg font-semibold">No Hp</h2>
                  <p>{data.no_hp}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
});

export const MaterialUser = component$(() => {
  const location = useLocation();
  const actionMaterial = useActionMaterial();
  const loadData = useLoadMaterialUser();
  const storeData = useStore({
    jenis: "",
    search: "",
    page: 0,
  });
  const pathName = location.url.pathname ?? "";

  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        const lengthData = data.material.length === 0;

        return (
          <div class="rounded-lg bg-base-100 p-5 shadow">
            <div class="flex items-center justify-between gap-5">
              <h1 class="text-md font-bold sm:text-xl ">Sampah Material</h1>
              <div class="flex items-center ">
                <input
                  type="text"
                  class="input input-xs input-bordered sm:input-sm md:input-md"
                  value={storeData.search}
                  placeholder="Cari Nama : Alex...."
                  onInput$={(_, el) => (storeData.search = el.value)}
                />

                <button
                  class="btn btn-info btn-xs sm:btn-sm md:btn-md"
                  onClick$={() => {
                    storeData.jenis = "";
                    storeData.page = 0;
                    actionMaterial.submit({
                      search: storeData.search,
                      jenis: storeData.jenis,
                      page: storeData.page,
                    });
                  }}
                >
                  <LuSearch />
                </button>
              </div>
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
                    <th>Jenis</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.material.map((d, i) => (
                    <tr key={d.id}>
                      <td>{i + 1}</td>
                      <td>{d.id}</td>
                      <td>{d.nama}</td>
                      <td>{d.jenis}</td>
                      <td>{d.berat}Kg</td>
                      <th>
                        <Link
                          href={`/menu/page/material/${d.id}?callback=${pathName}`}
                          class="btn btn-info btn-xs"
                        >
                          Detail
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <th colSpan={3}>
                      <div class="join">
                        <button
                          class={`btn join-item btn-sm ${storeData.page <= 0 && "btn-disabled"}`}
                          onClick$={() => {
                            // cannot be less than 0
                            if (storeData.page > 0) {
                              storeData.page--;
                              actionMaterial.submit({
                                search: storeData.search,
                                jenis: storeData.jenis,
                                page: storeData.page,
                              });
                            }
                          }}
                        >
                          «
                        </button>
                        <button class="btn join-item btn-sm">
                          Page {storeData.page}
                        </button>
                        <button
                          class={`btn join-item btn-sm ${lengthData && "btn-disabled"}`}
                          onClick$={() => {
                            // when data search leng is 0
                            if (!lengthData) {
                              storeData.page++;
                              actionMaterial.submit({
                                search: storeData.search,
                                jenis: storeData.jenis,
                                page: storeData.page,
                              });
                            }
                          }}
                        >
                          »
                        </button>
                      </div>
                    </th>
                    <th colSpan={3}>
                      <select
                        class="select select-bordered select-sm w-full max-w-xs"
                        onChange$={(_, el) => {
                          storeData.jenis = el.value;
                          actionMaterial.submit({
                            search: storeData.search,
                            jenis: el.value,
                            page: storeData.page,
                          });
                        }}
                      >
                        <option disabled selected>
                          Select Material
                        </option>
                        <option value={""}>All</option>
                        {data.select.map((d) => (
                          // @ts-ignore
                          <option key={d.jenis} value={d.jenis}>
                            {d.jenis} {String(d._count.jenis)}
                          </option>
                        ))}
                      </select>
                    </th>
                  </tr>
                </tfoot>
                {/*  */}
              </table>
            </div>
          </div>
        );
      }}
    />
  );
});
