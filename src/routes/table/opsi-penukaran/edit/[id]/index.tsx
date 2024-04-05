import {component$} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$,} from "@builder.io/qwik-city";
import {opsiPenukaran} from "~/db/opsiPenukaran";
import {zodOpsiPenukaran} from "~/lib/Zod";

export const useGet = routeLoader$(async ({params, status}) => {
  const id = parseInt(params["id"], 10);
  const material = await opsiPenukaran.findId(id);
  if (!material) {
    status(404);
  }
  return material;
});

export const useUpdate = routeAction$(
  async (data, {redirect, params}) => {
    const id = Number(params["id"]);
    
    const material = await opsiPenukaran.updateOne(id, {
      harga: Number(data.harga),
      deskripsi: data.deskripsi
    });
    if (material) throw redirect(302, `/table/opsi-penukaran/detail/${id}`);
    
    return material;
  },
  zodOpsiPenukaran,
);

export default component$(() => {
  const updateAction = useUpdate();
  const materialData = useGet();
  const zodError = updateAction?.value?.fieldErrors || null
  
  return (
    <section class="static card bg-base-300 ">
      <Form class="text-center card-body items-center"
            action={updateAction}
      >
        <h1 class="card-title">Update : {materialData.value?.deskripsi}</h1>
        
        <label class="form-control">
          Deskripsi
          <input
            name="deskripsi"
            class="input input-bordered"
            value={
              materialData?.value?.deskripsi ||
              updateAction.formData?.get("deskripsi")}
          />
        </label>
        
        
        <label class="form-control">
          Harga
          <input
            type="number"
            name="harga"
            class="input input-bordered"
            value={
              materialData?.value?.harga ||
              
              updateAction.formData?.get("harga")}
          />
        </label>
        
        
        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Update
          </button>
          
          <Link
            href={`/table/opsi-penukaran/detail/${materialData.value?.id}`}
            class="btn btn-primary "
          >
            Back
          </Link>
        </div>
      </Form>
      
      {updateAction.value?.failed && (<>
          {zodError?.deskripsi && <p>Nama {zodError?.deskripsi}</p>}
          {zodError?.harga && <p>Alamat {zodError.harga}</p>}
        </>
      )}
    
    </section>
  );
});
