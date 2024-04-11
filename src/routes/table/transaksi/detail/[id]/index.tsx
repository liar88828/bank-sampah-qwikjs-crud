import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { transaksi } from "~/db/transaksi";
import { getDate } from "~/lib/date";
import { LoaderTransaksi_Detail } from "~/type/transaksi.type";

export const useGetTransaksi = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10);
  const res = await transaksi.findDetail(id);
  // console.log(res)
  if (!res) {
    status(404);
  }
  return res as LoaderTransaksi_Detail;
});

export const useDeleteTransaksi = routeAction$(
  async (data, { redirect }) => {
    const user = await transaksi.deleteOne(Number(data.id));
    if (user) {
      throw redirect(302, "/table/transaksi");
    }
    return user;
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const { value: transaksi } = useGetTransaksi();
  const deleteTransaksi = useDeleteTransaksi();
  return (
    <section>
      {transaksi ? (
        <>
          <div class="card w-96 bg-base-300 shadow-xl">
            <div class="card-body">
              <h1 class="card-title">
                User detail : {getDate(transaksi.tgl_transaksi)}
              </h1>
              <table class="">
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td> : </td>
                    <td>{transaksi.User?.nama}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td> : </td>
                    <td>{transaksi.User?.alamat}</td>
                  </tr>

                  <tr>
                    <td>No Hp</td>
                    <td> : </td>
                    <td>{transaksi.User?.no_hp}</td>
                  </tr>

                  <tr>
                    <td>Berat</td>
                    <td> : </td>
                    <td>{transaksi.Sampah_Transaksi?.total_berat}</td>
                  </tr>
                  <tr>
                    <td>Harga </td>
                    <td> : </td>
                    <td>{transaksi.Sampah_Transaksi?.total_harga}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Transaksi</td>
                    <td> : </td>
                    <td>{getDate(transaksi.tgl_transaksi)}</td>
                  </tr>
                </tbody>
              </table>

              <div class="card-actions ">
                <Link
                  href={`/table/transaksi/edit/${transaksi.id}`}
                  class="btn btn-info"
                >
                  Edit
                </Link>

                <Form action={deleteTransaksi}>
                  <input type="hidden" value={transaksi.id} name={"id"} />

                  <button class="btn btn-error" type="submit">
                    Delete
                  </button>
                </Form>
                <Link href={`/table/transaksi/`} class="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>User not found</p>
      )}
    </section>
  );
});
