import {component$} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$, z, zod$,} from "@builder.io/qwik-city";
import {transaksi} from "~/db/transaksi";
import {getDate} from "~/lib/date";

export const useGetTransaksi = routeLoader$(async ({params, status}) => {
  const id = parseInt(params["id"], 10);
  const res = await transaksi.findId(id);
  if (!res) {
    status(404);
  }
  return res;
});

export const useDeleteTransaksi = routeAction$(
  async (data, {redirect}) => {
    const user = await transaksi.deleteOne(Number(data.id));
    if (user) {
      throw redirect(302, "/transaksi");
    }
    return user;
  },
  zod$({id: z.string()}),
);

export default component$(() => {
  const {value: transaksi} = useGetTransaksi();
  const deleteTransaksi = useDeleteTransaksi();
  return (
    <section>
      {transaksi ? (
        <>
          <div class="card w-96 bg-base-300 shadow-xl">
            <div class="card-body">
              <h1 class="card-title">User detail : {getDate(transaksi.tgl_transaksi)}</h1>
              
              <p>Berat : {transaksi.berat}</p>
              <p>Harga: {transaksi.harga}</p>
           
              <p>
                <span>create at </span>
                <span>
                  {getDate(transaksi.createdAt )}
                </span>
              </p>
              <div class="card-actions ">
                <Link href={`/transaksi/edit/${transaksi.id}`} class="btn btn-info">
                  Edit
                </Link>
                
                <Form action={deleteTransaksi}>
                  <input type="hidden" value={transaksi.id} name={"id"}/>
                  
                  <button class="btn btn-error" type="submit">
                    Delete
                  </button>
                </Form>
                <Link href={`/transaksi/`} class="btn btn-primary">
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
