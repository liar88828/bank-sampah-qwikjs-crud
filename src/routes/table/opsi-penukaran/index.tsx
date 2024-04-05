import {component$, Resource,} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$, z, zod$,} from "@builder.io/qwik-city";
import {opsiPenukaran} from "~/db/opsiPenukaran";

export const useGetAll = routeLoader$(async () => {
  return opsiPenukaran.findAll();
});

export const useDeleteOnly = routeAction$(
  async (data) => {
    return await opsiPenukaran.deleteOne(Number(data.id));
  },
  zod$({id: z.string()}),
);

export default component$(() => {
  const Datas = useGetAll();
  const deleteData = useDeleteOnly();
  
  
  return (
    <section class="container bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>Opsi Penukaran's directory</h1>
        <Link class="btn btn-info btn-xs" href="/table/opsi-penukaran/create">
          Create
        </Link>
      </div>
      
      <Resource
        value={Datas}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => (
          <div class="overflow-x-auto">
            <table class="static table table-zebra table-xs  rounded ">
              <thead>
              <tr>
                <th>No</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <th>{i + 1}</th>
                  <td>{d.deskripsi}</td>
                  <td>{d.harga}</td>
                  <td class="flex flex-nowrap gap-2">
                    <Link
                      href={`/table/opsi-penukaran/detail/${d.id}`}
                      class="btn btn-primary btn-xs"
                    >
                      Detail
                    </Link>
                    
                    <Form action={deleteData}>
                      <input type="hidden" name="id" value={d.id}/>
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
