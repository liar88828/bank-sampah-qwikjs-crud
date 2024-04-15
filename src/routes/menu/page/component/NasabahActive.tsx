import { Resource, component$, useStore } from "@builder.io/qwik";
import { LuSearch } from "@qwikest/icons/lucide";
import { useActionNasabah, useLoadNasabah } from "../layout";
import { Link } from "@builder.io/qwik-city";

export const NasabahActive = component$(() => {
  const actionMaterial = useActionNasabah();
  const loadData = useLoadNasabah();
  const storeData = useStore({
    search: "",
    page: 0,
  });

  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        const lengthData = data.searchNasabah.length === 0;
        return (
          <div class="rounded-lg bg-base-100 p-5 shadow">
            <div class="gap-5 sm:flex">
              <h1 class="text-md font-bold sm:text-xl ">Nasabah Users </h1>
              <div class="flex items-center ">
                <input
                  type="text"
                  class="input input-xs input-bordered sm:input-md"
                  value={storeData.search}
                  placeholder="Cari Nama : Alex...."
                  onInput$={(_, el) => (storeData.search = el.value)}
                />

                <button
                  class="btn btn-info btn-xs sm:btn-md"
                  onClick$={() => {
                    storeData.page = 0;
                    actionMaterial.submit({
                      search: storeData.search,
                      page: storeData.page,
                    });
                  }}
                >
                  <LuSearch />
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="table table-xs static sm:table-sm md:table-md ">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No Induk </th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>No Hp</th>
                    <th>KK</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.searchNasabah.map((d, i) => (
                    <tr key={d.nama}>
                      <td>{i + 1}</td>
                      <td>{d.id}</td>
                      <td>{d.nama}</td>
                      <td>{d.alamat}</td>
                      <td>{d.no_hp}</td>
                      <td>{d.email}</td>
                      <td>
                        <Link
                        href={`${d.id}`}
                        class="btn btn-info  btn-sm">details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <th colSpan={2}>
                      <div class="join">
                        <button
                          class={`btn join-item btn-sm ${storeData.page <= 0 && "btn-disabled"}`}
                          onClick$={() => {
                            // cannot be less than 0
                            if (storeData.page > 0) {
                              storeData.page--;
                              actionMaterial.submit({
                                search: storeData.search,
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
                                page: storeData.page,
                              });
                            }
                          }}
                        >
                          »
                        </button>
                      </div>
                    </th>
                    {/* <th colSpan={2}>
                      <select class="select select-bordered select-sm w-full max-w-xs">
                        <option disabled selected>
                          Who shot first?
                        </option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                      </select>
                    </th> */}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      }}
    />
  );
});
