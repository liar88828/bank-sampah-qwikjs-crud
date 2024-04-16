import { $, Resource, component$, useStore } from "@builder.io/qwik";
import { useLoadMaterial, useActionMaterial } from "../layout";
import { LuSearch } from "@qwikest/icons/lucide";
import { Link } from "@builder.io/qwik-city";

export const MaterialSampah = component$(() => {
  const actionMaterial = useActionMaterial();
  const loadData = useLoadMaterial();

  const storeData = useStore({
    jenis: "",
    search: "",
    page: 0,
    length: false,
  });

  const handlerSearch = $(() => {
    storeData.jenis = "";
    storeData.page = 0;
    actionMaterial.submit({
      search: storeData.search,
      jenis: storeData.jenis,
      page: storeData.page,
    });
  });

  const handlerDecrement = $(() => {
    // when data search leng is 0
    if (storeData.page > 0) {
      storeData.page--;
      actionMaterial.submit({
        search: storeData.search,
        jenis: storeData.jenis,
        page: storeData.page,
      });
    }
  });

  const handlerIncrement = $(() => {
    // when data search leng is 0
    if (!storeData.length) {
      storeData.page++;
      actionMaterial.submit({
        search: storeData.search,
        jenis: storeData.jenis,
        page: storeData.page,
      });
    }
  });

  const handlerSelect = $((_: Event, el: HTMLSelectElement) => {
    storeData.jenis = el.value;
    actionMaterial.submit({
      search: storeData.search,
      jenis: el.value,
      page: storeData.page,
    });
  });
  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        storeData.length = data.searchMaterial.length === 0;
        return (
          <div class="rounded-lg bg-base-100 p-5 shadow">
            <div class="gap-5 sm:flex">
              <h1 class="text-md font-bold sm:text-xl ">Sampah Material</h1>
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
                  onClick$={handlerSearch}
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
                  {data.searchMaterial.map((d, i) => (
                    <tr key={d.id}>
                      <td>{i + 1}</td>
                      <td>{d.id}</td>
                      <td>{d.nama}</td>
                      <td>{d.jenis}</td>
                      <td>{d.berat}Kg</td>
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

                <tfoot>
                  <tr>
                    <th colSpan={3}>
                      <div class="join">
                        <button
                          class={`btn join-item btn-sm ${storeData.page <= 0 && "btn-disabled"}`}
                          onClick$={handlerDecrement}
                        >
                          «
                        </button>
                        <button class="btn join-item btn-sm">
                          Page {storeData.page}
                        </button>
                        <button
                          class={`btn join-item btn-sm ${storeData.length && "btn-disabled"}`}
                          onClick$={handlerIncrement}
                        >
                          »
                        </button>
                      </div>
                    </th>
                    <th colSpan={3}>
                      <select
                        class="select select-bordered select-sm w-full max-w-xs"
                        onChange$={handlerSelect}
                      >
                        <option disabled selected>
                          Select Material
                        </option>
                        {data.selectMaterial.map((d) => (
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
