import {component$} from "@builder.io/qwik";
import {Form, routeAction$, z, zod$,} from "@builder.io/qwik-city";
import { material } from "~/db/material";

export const useCreate = routeAction$(
  async (data, {redirect}) => {
    const res= await material.createOne({
      berat: Number(data.berat),
      nama: data.nama
    });
    if (res) {
      throw redirect(302, "/table/material");
    }
    
    return res;
  },
  zod$({
    nama: z.string(),
    berat: z.string(),
  }),
);

export default component$(() => {
  const createAction = useCreate();
  const zodError = createAction?.value?.fieldErrors || null
  return (
    <section class="card bg-neutral text-neutral-content ">
      <Form class="text-cente card-body items-center" action={createAction}>
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
      
      
      {createAction.value?.failed && (<>
          {zodError?.berat && <p>Nama {zodError?.nama}</p>}
          {zodError?.berat && <p>Alamat {zodError.berat}</p>}
        </>
      )}
    
    
    </section>
  );
});
