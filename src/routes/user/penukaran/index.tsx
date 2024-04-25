import { Session } from "@auth/core/types";
import { component$, Resource, useSignal } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  useLocation,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { LuSearch } from "@qwikest/icons/lucide";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { transaksi } from "~/db/transaksi";
import { getDate } from "~/lib/date";

export const useLoadPenyerahan = routeLoader$(async ({ sharedMap, query }) => {
  const session: Session | null = sharedMap.get("session") as Session;
  const id = Number(session?.user?.id);

  let page = Number(query.get("page") ?? 0);
  page = page <= 0 ? 0 : page;

  const search: string | null = query.get("search") ?? "";

  const res = await transaksi.findPenukaranTransaksi(id, page, search);
  return res;
});

export const useDeleteTransaksi = routeAction$(
  async (data) => {
    return await transaksi.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  return (
    <section class="container space-y-3">
      <Heads />
      <Tables />
    </section>
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Table-Penukaran")} />;
});

export const Tables = component$(() => {
  const loadData = useLoadPenyerahan();
  const search = useSignal("");
  const local = useLocation();
  const page = local.url.searchParams.get("page");

  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        let buttonOff = data.length === 0;
        let buttonLess = data.length > 0;
        return (
          <div class="card static bg-base-100 ">
            <div class="card-body">
              <div class="mb-2 flex items-center gap-2">
                <h1>Penukaran directory</h1>

                <Link
                  class="btn btn-info btn-xs"
                  href="create"
                >
                  Create
                </Link>
              </div>
              <div class="overflow-x-auto ">
                <table class="table table-zebra table-xs static  rounded  bg-base-100">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Tanggal Transaksi</th>
                      <th>Berat</th>
                      <th>Harga</th>
                      <th>Deskripsi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d,i) => (
                      <tr key={d.id}>
                        <th>{i + 1}</th>
                        <th>{d.id}</th>
                        <td>{getDate(d.createdAt)}</td>
                        <td>{d.berat ?? "kosong"}</td>
                        <td>{d.harga ?? "kosong"}</td>
                        <td>{d.deskripsi || "kosong"}</td>
                        <td class="flex flex-nowrap gap-2">
                          <Link href={`detail/${d.id}`} class="btn btn-primary btn-xs">
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={2}>
                        <div class="join">
                          <Link
                            // aria-disabled={buttonOff}
                            href={`/user/transaksi/?page=${Number(page) - 1}`}
                            class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
                          >
                            «
                          </Link>
                          <button class="btn join-item btn-sm">
                            Page {page}
                          </button>
                          <Link
                            aria-disabled={buttonOff}
                            href={`/user/transaksi/?page=${Number(page) + 1}`}
                            class={`btn join-item btn-sm ${buttonOff && "btn-disabled"}`}
                          >
                            »
                          </Link>
                        </div>
                      </th>
                      <th colSpan={2} class="">
                        <input
                          type="text"
                          class="input input-sm input-bordered"
                          placeholder="Cari Nama : Alex...."
                          bind:value={search}
                        />
                        <Link
                          type="button"
                          class="btn btn-square btn-primary btn-sm"
                          href={`/user/transaksi/?page=${Number(page)}&search=${search.value} `}
                        >
                          <LuSearch />
                        </Link>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
});
