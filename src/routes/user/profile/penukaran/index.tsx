import { Session } from "@auth/core/types";
import { component$, Resource, useSignal } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  useLocation,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { LuSearch } from "@qwikest/icons/lucide";
import { riwayatPenukaran } from "~/db/riwayatPenukaran";
import { transaksi } from "~/db/transaksi";
import { getDate } from "~/lib/date";
import { LoaderRiwayat_Penukaran } from "~/type/riwayatPenukaran.type";

export const useLoadUserPenukaran = routeLoader$(
  async ({ sharedMap, query }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const id = Number(session?.user?.id);

    let page = Number(query.get("page") ?? 0);
    page = page <= 0 ? 0 : page;

    const search: string | null = query.get("search") ?? "";

    const res = await riwayatPenukaran.findAllUser(id, page, search);
    return res as LoaderRiwayat_Penukaran[];
  },
);
export const useDeletePenukaran = routeAction$(
  async (data) => {
    return await transaksi.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const dataLoad = useLoadUserPenukaran();
  const dataDelete = useDeletePenukaran();
  const search = useSignal("");
  const local = useLocation();
  // console.log(local)
  const page = local.url.searchParams.get("page");

  return (
    <section class="container bg-base-300 p-5">
      <Link class="btn btn-warning btn-xs" href="/user/profile">
        Back
      </Link>
      <div class="mb-2 flex items-center gap-2">
        <h1>Penukaran's directory</h1>

        <Link class="btn btn-info btn-xs" href="/user/profile/create">
          Create
        </Link>
      </div>

      <Resource
        value={dataLoad}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(datas) => {
          let buttonOff = datas.length === 0;
          let buttonLess = datas.length > 0;
          return (
            <div class="overflow-x-auto ">
              <table class="table table-zebra table-xs static  rounded  bg-base-100">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal Penukaran</th>
                    <th>Id_User</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((d, i) => (
                    <tr key={d.id}>
                      <th>{i + 1}</th>
                      <td>{getDate(d.tgl_tukar)}</td>
                      <td>{d.id_user_penukaran}</td>

                      <td class="flex flex-nowrap gap-2">
                        <Link
                          href={`/user/profile/penukaran/detail/${d.id}`}
                          class="btn btn-primary btn-xs"
                        >
                          Detail
                        </Link>

                        <Form action={dataDelete}>
                          <input type="hidden" name="id" value={d.id} />
                          <button type="submit" class="btn btn-error btn-xs">
                            Delete
                          </button>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={2}>
                      <div class="join">
                        <Link
                          href={`/user/profile/penukaran?page=${Number(page) - 1}`}
                          class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
                        >
                          «
                        </Link>
                        <button class="btn join-item btn-sm">
                          Page {page}
                        </button>
                        <Link
                          aria-disabled={buttonOff}
                          href={`user/profile/penukaran?page=${Number(page) + 1}`}
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
                        href={`user/profile/penukaran?page=${Number(page)}&search=${search.value} `}
                      >
                        <LuSearch />
                      </Link>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        }}
      />
    </section>
  );
});