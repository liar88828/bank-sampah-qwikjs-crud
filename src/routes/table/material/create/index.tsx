import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { material } from "~/db/material";
import { zodMaterial } from "~/lib/Zod";

export const useCreate = routeAction$(async (data, { redirect }) => {
  const res = await material.createOne({
    nama: data.nama,
    jenis: data.jenis,
    berat: Number(data.berat),
  });
  if (res) {
    throw redirect(302, "/table/material");
  }

  return res;
}, zodMaterial);

export default component$(() => {
  const createAction = useCreate();
  const zodError = createAction?.value?.fieldErrors || null;
  return (
    <section class="card bg-base-300  ">
      <Form class="card-body items-center text-center" action={createAction}>
        <h1 class="card-title">Create User</h1>

        <label class="form-control">
          Nama
          <input
            name="nama"
            class="input input-bordered"
            value={createAction.formData?.get("name")}
          />
        </label>

        <label class="form-control">
          Jenis
          <input
            name="jenis"
            class="input input-bordered"
            value={createAction.formData?.get("jenis")}
          />
        </label>

        <label class="form-control">
          Berat
          <input
            type="number"
            name="berat"
            class="input input-bordered"
            value={createAction.formData?.get("berat")}
          />
        </label>

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>
        </div>
      </Form>
      {!createAction.value?.failed && (
        <div>
          <h2>Material created successfully!</h2>
        </div>
      )}

      {createAction.value?.failed && (
        <>
          {zodError?.berat && <p>Nama {zodError?.nama}</p>}
          {zodError?.berat && <p>Alamat {zodError.berat}</p>}
          {zodError?.jenis && <p>Alamat {zodError.jenis}</p>}
        </>
      )}
    </section>
  );
});
