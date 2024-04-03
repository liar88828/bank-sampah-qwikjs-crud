import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { material } from "~/db/material";

export const useGetId = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10);
  const res = material.findId(id);

  if (!res) {
    status(404);
  }
  return res;
});

export const useDelete = routeAction$(
  async (data, { redirect }) => {
    const res = await material.deleteOne(Number(data.id));
    if (res) {
      throw redirect(302, "/material");
    }
    return res;
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const { value: material } = useGetId();
  const deleteMaterial = useDelete();
  return (
    <section>
      {material ? (
        <>
          <div class="card w-96 bg-base-300 shadow-xl">
            <div class="card-body">
              <h1 class="card-title">Material : {material.nama}</h1>

              <p>Berat : {material.berat}</p>

              <div class="card-actions ">
                <Link
                  href={`/material/edit/${material.id}`}
                  class="btn btn-info"
                >
                  Edit
                </Link>

                <Form action={deleteMaterial}>
                  <input type="hidden" value={material.id} name={"id"} />

                  <button class="btn btn-error" type="submit">
                    Delete
                  </button>
                </Form>
                <Link href={`/material/`} class="btn btn-primary">
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
