import { component$, Resource } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { riwayatPenukaran } from "~/db/riwayatPenukaran";
import { getDate } from "~/lib/date";

export const useGetAll = routeLoader$(async () => {
  return riwayatPenukaran.findAll();
});

export const useDeleteOnly = routeAction$(
  async (data) => {
    return riwayatPenukaran.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const Datas = useGetAll();
  const deleteData = useDeleteOnly();

  return (
    <section class="container bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>Riwayat Penukaran's directory</h1>
        <Link class="btn btn-info btn-xs" href="/riwayat-penukaran/create">
          Create
        </Link>
      </div>

      <Resource
        value={Datas}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => (
          <div class="overflow-x-auto">
            <table class="table table-zebra table-xs static  rounded ">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal Tukar</th>
                  <th>User</th>
                  <th>Opsi Penukaran</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={d.id}>
                    <th>{i + 1}</th>
                    <td>{getDate(d.tgl_tukar)}</td>
                    <td>
                      {d.id_user} {d.User?.nama}
                    </td>
                    <td>
                      {d.id_opsi_penukaran} {d.Opsi_Penukaran?.deskripsi}
                    </td>
                    <td class="flex flex-nowrap gap-2">
                      <Link
                        href={`/riwayat-penukaran/detail/${d.id}`}
                        class="btn btn-primary btn-xs"
                      >
                        Detail
                      </Link>

                      <Form action={deleteData}>
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
        )}
      />
    </section>
  );
});
