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
import { material } from "~/db/material";
import { transaksi } from "~/db/transaksi";
import { getDate } from "~/lib/date";

export const useLoadUserTransaksi = routeLoader$(
  async ({ sharedMap, query }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const id = Number(session?.user?.id);

    let page = Number(query.get("page") ?? 0);
    page = page <= 0 ? 0 : page;

    const search: string | null = query.get("search") ?? "";

    const res = await material.findAllUser(id, page, search);
    return res; // as LoaderTransaksi[];
  },
);

export const useDeleteTransaksi = routeAction$(
  async (data) => {
    return await transaksi.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  return (
    <section class="container space-y-2">
      <Heads />
      <Tables />
    </section>
  );
});

export const Tables = component$(() => {
  const loadData = useLoadUserTransaksi();
  const search = useSignal("");
  const local = useLocation();
  const page = local.url.searchParams.get("page");
  // const transaksiDelete = useDeleteTransaksi();

  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        // console.log(data[0].Material);
        let buttonOff = data.length === 0;
        let buttonLess = data.length > 0;
        console.log(data)
        return (
          <div class="card static bg-base-100 ">
            <div class="card-body">
              <div class="mb-2 flex items-center gap-2">
                <h1>Transaksi's directory</h1>

                <Link
                  class="btn btn-info btn-xs"
                  href="/table/transaksi/create"
                >
                  Create
                </Link>
              </div>
              <div class="overflow-x-auto ">
                <table class="table table-zebra table-xs static  rounded  bg-base-100">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal Transaksi</th>
                      <th>Id_User</th>
                      <th>Material</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((t, i) => (
                      <tr key={t.id}>
                        <th>{i + 1}</th>
                        <td>{getDate(t.tgl_transaksi)}</td>
                        <td>{t.id_user}</td>
                        <td>{t.Material?.nama || "kosong"}</td>

                        <td class="flex flex-nowrap gap-2">
                          {t.Material?.nama&&
                          <Link
                          href={`${t.Material?.id}`}
                          class="btn btn-primary btn-xs"
                          >
                            Detail
                          </Link>
                          }

                          {/* <Form action={transaksiDelete}>
                        <input type="hidden" name="id" value={t.id} />
                        <button
                          type="submit"
                          class="btn btn-error btn-xs"
                        >
                          Delete
                        </button>
                      </Form> */}
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

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Transaksi")} />;
});
