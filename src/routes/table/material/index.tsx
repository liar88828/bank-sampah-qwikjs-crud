import { component$, Resource } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { material } from "~/db/material/material";

export const useGetAll = routeLoader$(async () => {
  return material.findAll();
});

export const useDeleteOnly = routeAction$(
  async (data) => {
    return material.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  return (
    <section class="container  space-y-4">
      <Heads />
      <Tables />
    </section>
  );
});

export const Tables = component$(() => {
  const dataLoad = useGetAll();
  const materialDelete = useDeleteOnly();
  return (
    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => (
        <div class="card static bg-base-100 ">
          <div class="card-body">
            <div class="mb-2 flex items-center gap-2">
              <h1>Material's directory</h1>
              <Link class="btn btn-info btn-xs" href="/table/material/create">
                Create
              </Link>
            </div>

            <div class="overflow-x-auto ">
              <table class="table table-zebra table-xs static  rounded ">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Berat</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Kategori</th>
                    <th>Deskripsi</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={d.id}>
                      <th>{i + 1}</th>
                      <td>{d.nama}</td>
                      <td>
                        {d.berat} {d.satuan}
                      </td>
                      <td>{d.harga}</td>
                      <td>{d.jumlah}</td>
                      <td>{d.kategori}</td>
                      <td>{d.deskripsi}</td>
                      <td class="flex flex-nowrap gap-2">
                        <Link
                          href={`/table/material/detail/${d.id}`}
                          class="btn btn-primary btn-xs"
                        >
                          Detail
                        </Link>

                        <Form action={materialDelete}>
                          <input type="hidden" name="id" value={d.id} />
                          <button type="submit" class="btn btn-error btn-xs">
                            Delete
                          </button>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    />
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Material")} />;
});
