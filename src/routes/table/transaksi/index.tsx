import {component$, Resource,} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$, z, zod$,} from "@builder.io/qwik-city";
import {transaksi} from "~/db/transaksi";
import {getDate} from "~/lib/date";


export const useGetTransaksi = routeLoader$(async () => {
  return transaksi.findAll();
});

export const useDeleteTransaksi = routeAction$(
  async (data) => {
    return await transaksi.deleteOne(Number(data.id));
  },
  zod$({id: z.string()}),
);

export default component$(() => {
  const transaksiData = useGetTransaksi();
  const transaksiDelete = useDeleteTransaksi();
  
  return (
    <section class="container bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>Transaksi's directory</h1>
        <Link class="btn btn-info btn-xs" href="/table/transaksi/create">
          Create
        </Link>
      </div>
      
      <Resource
        value={transaksiData}
        onPending={() => <span class="loading loading-spinner"></span>}
        onResolved={(transaksi) => (
          <div class="overflow-x-auto">
            <table class="static table table-zebra table-xs  rounded ">
              <thead>
              <tr>
                <th>No</th>
                <th>Tanggal Transaksi</th>
                <th>Berat</th>
                <th>Harga</th>
                <th>Id_User</th>
                <th>Id_Material</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {transaksi.map((t, i) => (
                <tr key={t.id}>
                  <th>{i + 1}</th>
                  <td>{getDate(t.tgl_transaksi)}</td>
                  <td>{t.berat}</td>
                  <td>{t.harga}</td>
                  <td>{t.id_user}</td>
                  <td>{t.id_material}</td>
                  
                  <td class="flex flex-nowrap gap-2">
                    <Link
                      href={`/table/transaksi/detail/${t.id}`}
                      class="btn btn-primary btn-xs"
                    >
                      Detail
                    </Link>
                    
                    <Form action={transaksiDelete}>
                      <input type="hidden" name="id" value={t.id}/>
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
        onRejected={() => <span>Error</span>}
      />
    </section>
  );
});