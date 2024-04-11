import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { LuSearch } from "@qwikest/icons/lucide";
import { useSearch } from "../../../../hook/useSearch";
import { usePagination } from "../../../../hook/usePagination";
import { TUser } from "~/type/user";

export const NasabahActive = component$(() => {
  const search = useSearch();
  const pagination = usePagination();

  const dataLoad = useResource$<TUser[]>(async ({ track, cleanup }) => {
    track(() => {
      return [search.valueSearch, pagination.pages];
    });

    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));

    let pageSearch =
      search.valueSearch.length > 0 ? "0" : String(pagination.pages);

    // console.log(search.valueSearch.length > 0)

    const url = new URL("http://localhost:5173/api/nasabah");
    url.searchParams.set("name", search.valueSearch);
    url.searchParams.set("page", pageSearch);
    // console.log(url.search);
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
  });

  return (
    <div class="rounded-lg bg-base-100 p-5 shadow">
      <div class="flex items-center gap-5">
        <h1 class="text-md font-bold sm:text-xl ">Nasabah Users </h1>

        <input
          type="text"
          class="input input-xs input-bordered sm:input-md"
          value={search.search}
          placeholder="Cari Nama : Alex...."
          onInput$={(_, el) => (search.search = el.value)}
        />

        <button
          class="btn btn-info btn-xs sm:btn-md"
          onClick$={() => search.goSearch()}
        >
          <LuSearch />
        </button>
      </div>
      <Resource
        value={dataLoad}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => {
          return (
            <>
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
                    {data.map((d, i) => (
                      <tr key={d.nama}>
                        <td>{i + 1}</td>
                        <td class="gap flex items-center">
                          <div class="avatar static  ">{d.id}</div>
                        </td>
                        <td>
                          <div class=" text-lg "> {d.nama} </div>
                        </td>
                        <td>
                          <div class="">{d.alamat}</div>
                        </td>
                        <td>
                          <div class="whitespace-nowrap text-sm">{d.no_hp}</div>
                        </td>
                        <td>
                          <div>{d.email}</div>
                        </td>

                        <td>
                          <div class="btn btn-info  btn-sm">Info</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th colSpan={2}>
                        <div class="join">
                          <button
                            class="btn join-item btn-sm"
                            onClick$={() => {
                              pagination.decrement();
                              search.valueSearch = "";
                            }}
                          >
                            «
                          </button>
                          <button class="btn join-item btn-sm">
                            Page {pagination.pages}
                          </button>
                          <button
                            class="btn join-item btn-sm"
                            onClick$={() => {
                              pagination.increment();
                              search.valueSearch = "";
                            }}
                          >
                            »
                          </button>
                        </div>
                      </th>
                      <th colSpan={2}>
                        <select class="select select-bordered select-sm w-full max-w-xs">
                          <option disabled selected>
                            Who shot first?
                          </option>
                          <option>Han Solo</option>
                          <option>Greedo</option>
                        </select>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          );
        }}
      />
    </div>
  );
});
