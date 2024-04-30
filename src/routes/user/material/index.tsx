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
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { material } from "~/db/material/material";
import { transaksi } from "~/db/transaksi";
import { getDate } from "~/lib/date";

export const useLoadUserMaterial = routeLoader$(
  async ({ sharedMap, query }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const id = Number(session?.user?.id);

    let page = Number(query.get("page") ?? 0);
    page = page <= 0 ? 0 : page;

    const search: string | null = query.get("search") ?? "";

    return transaksi.findMaterialTransaksi(id, page, search);
  },
);

export const useDeleteUserMaterial = routeAction$(
  async (data) => {
    return material.deleteOne(Number(data.id));
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

export const Tables = component$(() => {
  const dataLoad = useLoadUserMaterial();
  const dataDelete = useDeleteUserMaterial();
  const search = useSignal("");
  const local = useLocation();
  const page = local.url.searchParams.get("page");

  return (
    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(datas) => {
        let buttonOff = datas.length === 0;
        let buttonLess = datas.length > 0;

        return (
          <div class="card static bg-base-100 ">
            <div class="card-body">
              <div class=" flex items-center gap-2">
                <h1>Material's directory</h1>
                <Link class="btn btn-info btn-xs" href="/table/material/create">
                  Create
                </Link>
              </div>

              <div class="overflow-x-auto">
                <table class="table table-zebra table-xs static  rounded bg-base-100">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Jenis</th>
                      <th>Berat</th>
                      <th>Create</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((d, i) => (
                      <tr key={d.id}>
                        <th>{i + 1}</th>
                        <td>{d.id}</td>
                        <td>{d.nama}</td>
                        <td>{d.jenis}</td>
                        <td>{d.berat}</td>
                        <td>{getDate(d.createdAt)}</td>
                        <td class="flex flex-nowrap gap-2">
                          <Link
                            href={`/table/material/detail/${d.id}`}
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
                            // aria-disabled={buttonOff}
                            href={`/user/profile/material/?page=${Number(page) - 1}`}
                            class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
                          >
                            «
                          </Link>
                          <button class="btn join-item btn-sm">
                            Page {page}
                          </button>
                          <Link
                            aria-disabled={buttonOff}
                            href={`/user/profile/material/?page=${Number(page) + 1}`}
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
                          href={`/user/profile/material/?page=${Number(page)}&search=${search.value} `}
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
  return (
    <>
      {/* <Link class="btn btn-warning  btn-xs" href="/user/profile">
        Back
      </Link> */}

      <Breadcrumbs data={getBreadcrumbTrail("Material")} />
    </>
  );
});

//   [
//   {
//     name: "Home",
//     link: "/",
//   },
//   {
//     name: "Profile",
//     link: "/user/profile/",
//   },
//   {
//     name: "Material",
//     link: "/user/profile/material",
//   },
// ]
