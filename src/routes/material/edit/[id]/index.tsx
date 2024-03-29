import {component$} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$, z, zod$,} from "@builder.io/qwik-city";
import {findIdMaterial, updateMaterial,} from "~/db/material";

export const useGet = routeLoader$(async ({params, status}) => {
  const id = parseInt(params["id"], 10);
  const material = await findIdMaterial(id);
  if (!material) {
    status(404);
  }
  return material;
});

export const useUpdate = routeAction$(
  async (data, {redirect, params}) => {
    const id = Number(params["id"]);
    
    const material = await updateMaterial(id, {
      berat: Number(data.berat),
      nama: data.nama
    });
    if (material) throw redirect(302, `/material/detail/${id}`);
    console.log(material);
    return material;
  },
  zod$({
    berat: z.string(),
    nama: z.string().min(1).max(30),
  }),
);

export default component$(() => {
  const updateAction = useUpdate();
  const materialData = useGet();
  console.log(updateAction.value);
  return (
    <section class="card bg-neutral text-neutral-content ">
      <Form class="text-cente card-body items-center"
            action={updateAction}
      >
        <h1 class="card-title">Update : {materialData.value?.nama}</h1>
        
        <label class="form-control">
          Nama
          <input
            name="nama"
            class="input input-bordered"
            value={
              materialData.value?.nama || updateAction.formData?.get("name")
            }
          />
        </label>
        
        <label class="form-control">
          Berat
          <input
            name="berat"
            type={'number'}
            class="input input-bordered"
            value={
              materialData.value?.berat || updateAction.formData?.get("alamat")
            }
          />
        </label>
        
        
        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Update
          </button>
          
          <Link
            href={`/material/detail/${materialData.value?.id}`}
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
