import { component$ } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { riwayatPenukaran } from "~/db/riwayatPenukaran";
import { getDate } from "~/lib/date";

export const useGetId = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10);
  const res = await riwayatPenukaran.findId(id);
  if (!res) {
    status(404);
  }
  return res;
});

export const useDelete = routeAction$(
  async (data, { redirect }) => {
    const res = await riwayatPenukaran.deleteOne(Number(data.id));
    if (res) {
      throw redirect(302, "/table/riwayat-penukaran");
    }
    return res;
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const { value } = useGetId();
  const deleteData = useDelete();
  return (
    <section>
      {value ? (
        <>
          <div class="card static w-96 bg-base-300 shadow-xl">
            <div class="card-body">
              <h1 class="card-title">
                Opsi Penukaran : {getDate(value.tgl_tukar)}
              </h1>

              <p>
                Nama : {value.User?.nama} :{value.User?.id}
              </p>
              <p>
                Deskripsi : {value.Opsi_Penukaran?.deskripsi} :
                {value.Opsi_Penukaran?.id}
              </p>

              <div class="card-actions ">
                <Link
                  href={`/table/riwayat-penukaran/edit/${value.id}`}
                  class="btn btn-info"
                >
                  Edit
                </Link>

                {/* <Form action={deleteData}>
                  <input type="hidden" value={value.id} name={"id"} />
                  <button class="btn btn-error" type="submit">
                   
                  </button>
                </Form> */}

                <button
                  class="btn btn-error"
                  onClick$={async () => {
                    await deleteData.submit({ id: value.id.toString() });
                  }}
                >Delete</button>
                <Link href={`/table/riwayat-penukaran/`} class="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Material not found</p>
      )}
    </section>
  );
});
