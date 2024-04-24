import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { opsiPenukaran } from "~/db/opsiPenukaran";

export const useGetId = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10);
  const res = await opsiPenukaran.findId(id);
  if (!res) {
    status(404);
  }
  return res;
});

export const useDelete = routeAction$(
  async (data, { redirect }) => {
    const res = await opsiPenukaran.deleteOne(Number(data.id));
    if (res) {
      throw redirect(302, "/table/opsi-penukaran");
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
        <div class="card static w-96 bg-base-300 shadow-xl">
          <div class="card-body">
            <h1 class="card-title">Opsi Penukaran : {value.id}</h1>

            <p>Deskripsi : {value?.deskripsi}</p>
            <p>harga : {value.harga}</p>

            <div class="card-actions ">
              <Link
                href={`/table/opsi-penukaran/edit/${value.id}`}
                class="btn btn-info"
              >
                Edit
              </Link>

              <Form action={deleteData}>
                <input type="hidden" value={value.id} name={"id"} />
                <button class="btn btn-error" type="submit">
                  Delete
                </button>
              </Form>
              <Link href={`/table/opsi-penukaran`} class="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Material not found</p>
      )}
    </section>
  );
});
