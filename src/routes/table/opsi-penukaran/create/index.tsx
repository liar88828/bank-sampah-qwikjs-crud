import {component$} from "@builder.io/qwik";
import {Form, routeAction$,} from "@builder.io/qwik-city";
import {zodOpsiPenukaran} from "~/lib/Zod";
import {opsiPenukaran} from "~/db/opsiPenukaran";

export const useCreateOpsiPenukaran = routeAction$(
  async (data, {redirect}) => {
    const json = await opsiPenukaran.createOne({
      harga: Number(data.harga),
      deskripsi: data.deskripsi
    });
    if (json) {
      throw redirect(302, "/table/opsi-penukaran");
    }
    
    return json;
  },
  zodOpsiPenukaran
);

export default component$(() => {
  const createAction = useCreateOpsiPenukaran();
  const zodError = createAction?.value?.fieldErrors || null
  return (
    <section class="static card bg-base-300">
      <Form class="text-center card-body items-center" action={createAction}>
        <h1 class="card-title">Create User</h1>
        
        <label class="form-control">
          Deskripsi
          <input
            name="deskripsi"
            class="input input-bordered"
            value={createAction.formData?.get("deskripsi")}
          />
        </label>
        
        
        <label class="form-control">
          Harga
          <input
            type="number"
            name="harga"
            class="input input-bordered"
            value={createAction.formData?.get("harga")}
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
      
      
      {createAction.value?.failed && (<>
          {zodError?.deskripsi && <p>Nama {zodError?.deskripsi}</p>}
          {zodError?.harga && <p>Alamat {zodError.harga}</p>}
        </>
      )}
    
    
    </section>
  );
});
