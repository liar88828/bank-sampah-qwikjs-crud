import { component$, Resource } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { material } from "~/db/material";

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
  const materialData = useGetAll();
  const materialDelete = useDeleteOnly();

  return (
    <section class="container bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>Material's directory</h1>
        <Link class="btn btn-info btn-xs" href="/material/create">
          Create
        </Link>
      </div>

      <Resource
        value={materialData}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(materials) => (
          <div class="overflow-x-auto">
            <table class="table table-zebra table-xs static  rounded ">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Material</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, i) => (
                  <tr key={material.id}>
                    <th>{i + 1}</th>
                    <td>{material.nama}</td>
                    <td>{material.berat}</td>
                    <td class="flex flex-nowrap gap-2">
                      <Link
                        href={`/material/detail/${material.id}`}
                        class="btn btn-primary btn-xs"
                      >
                        Detail
                      </Link>

                      <Form action={materialDelete}>
                        <input type="hidden" name="id" value={material.id} />
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
        )}
      />
    </section>
  );
});
