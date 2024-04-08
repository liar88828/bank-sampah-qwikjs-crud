import { $, QRL, Resource, component$, useResource$, useSignal, useStore, } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { useDebouncer } from "../utils/Debouncer";
import { LuSearch } from "@qwikest/icons/lucide";


type Search = {
  search?: string,
  valueSearch: string,
  goSearch: QRL<(this: Search) => void>;
};
type Pagination = {
  pages: number,
  increment: QRL<(this: Pagination) => void>;
  decrement: QRL<(this: Pagination) => void>;
};

export const NasabahActive = component$(() => {
  const search = useStore<Search>({
    search: '',
    valueSearch: '',
    goSearch: $(function (this: Search) {
      console.log(this.goSearch)
      this.valueSearch = this.search || ''
    })
  })

  const pagination = useStore<Pagination>({
    pages: 0,
    increment: $(function (this: Pagination,) {
      this.pages += 1
    }),
    decrement: $(function (this: Pagination,) {
      if (this.pages > 0) {
        this.pages -= 1
      }
    }),

  })


  const dataLoad = useResource$(async ({ track, cleanup }) => {

    track(() => {
      return [search.valueSearch, pagination.pages]
    })

    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));



    let pageSearch = search.valueSearch.length > 0 ? '0' :
      String(pagination.pages)

    // console.log(search.valueSearch.length > 0)

    const url = new URL('http://localhost:5173/api/nasabah')
    url.searchParams.set('name', search.valueSearch)
    url.searchParams.set('page', pageSearch)
    // console.log(url)
    const res = await fetch(url,)
    const json = await res.json()
    return json.data
  })

  // console.log(dataLoad.value)


  return (
    <div class="rounded-lg bg-base-100 p-5 shadow">

      <div class="flex items-center gap-5">
        <h1 class="text-md sm:text-xl font-bold ">Nasabah Users </h1>

        <input
          type="text"
          class='input input-bordered input-xs sm:input-md'
          value={search.search}
          placeholder="Cari Nama : Alex...."
          onInput$={(_, el) => (search.search = el.value)}
        />

        <button class='btn btn-info btn-xs sm:btn-md'
          onClick$={() => search.goSearch()}>
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
                          <button class="btn join-item btn-sm"
                            onClick$={() => { pagination.decrement() }}
                          >«</button>
                          <button class="btn join-item btn-sm">Page {pagination.pages}</button>
                          <button class="btn join-item btn-sm"
                            onClick$={() => pagination.increment()}
                          >»</button>
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
          )
        }} />
    </div>
  );
});


export const dataTest = [
  {
    id: "ea51f2f1",
    no_hp: "081-3288-08225",
    name: "Barbara",
    alamat: "Turkmenistan",
    work: "admin",
    kk: 3,
  },
  {
    id: "74830bfa",
    no_hp: "081-2865-37205",
    name: "Isabelle",
    alamat: "El Salvador",
    work: "product",
    kk: 7,
  },
  {
    id: "6bd6682a",
    no_hp: "081-3634-37799",
    name: "Josephine",
    alamat: "Peru",
    work: "developer",
    kk: 4,
  },
  {
    id: "a882bfa5",
    no_hp: "081-6283-15260",
    name: "Ophelia",
    alamat: "Equatorial Guinea",
    work: "developer",
    kk: 3,
  },
  {
    id: "bf6cbdbd",
    no_hp: "081-9089-51550",
    name: "Beatrice",
    alamat: "Grenada",
    work: "developer",
    kk: 3,
  },
];