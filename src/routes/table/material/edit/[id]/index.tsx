import {component$} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$, z, zod$,} from "@builder.io/qwik-city";
import { material } from "~/db/material";
import { zodMaterial } from "~/lib/Zod";

export const useGet = routeLoader$(async ({params, status}) => {
  const id = parseInt(params["id"], 10);
  const res = await material.findId(id);
  if (!res) {
    status(404);
  }
  return res;
});

export const useUpdate = routeAction$(
  async (data, {redirect, params}) => {
    const id = Number(params["id"]);
    
    const res = await material.updateOne(id, {
      berat: Number(data.berat),
      nama: data.nama,
      jenis: data.jenis
    });
    if (res) throw redirect(302, `/table/material/detail/${id}`);
    console.log(res);
    return res;
  },
   zodMaterial
);

export default component$(() => {
  const updateAction = useUpdate();
  const materialData = useGet();
  console.log(updateAction.value);
  return (
    <section class="card bg-base-300 ">
      <Form class="text-center card-body items-center" action={updateAction}>
        <h1 class="card-title">Update : {materialData.value?.nama}</h1>c
        <label class="form-control">
          Nama
          <input
            name="nama"
            class="input input-bordered"
            value={
              materialData.value?.nama || updateAction.formData?.get("nama")
            }
          />
        </label>
        <label class="form-control">
          Jenis
          <input
            name="jenis"
            class="input input-bordered"
            value={
              materialData.value?.nama || updateAction.formData?.get("jenis")
            }
          />
        </label>
        <label class="form-control">
          Berat
          <input
            name="berat"
            type={"number"}
            class="input input-bordered"
            value={
              materialData.value?.berat || updateAction.formData?.get("berat")
            }
          />
        </label>
        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Update
          </button>

          <Link
            href={`/table/material/detail/${materialData.value?.id}`}
            class="btn btn-primary "
          >
            Back
          </Link>
        </div>
      </Form>
      {!updateAction.value?.failed && (
        <div>
          <h2> Update successfully!</h2>
        </div>
      )}

      {updateAction.value?.failed && (
        <p>Nama {updateAction.value.fieldErrors.nama}</p>
      )}

      {updateAction.value?.failed && (
        <p>Alamat {updateAction.value.fieldErrors.berat}</p>
      )}
    </section>
  );
});
