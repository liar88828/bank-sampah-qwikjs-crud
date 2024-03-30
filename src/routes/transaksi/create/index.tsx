import {component$} from "@builder.io/qwik";
import {Form, routeAction$, z, zod$,} from "@builder.io/qwik-city";
import {transaksi} from "~/db/transaksi";

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    const user = await transaksi.createOne({
      tgl_transaksi:new Date (data.tgl_transaksi),
      berat:Number(data.berat),
      harga:Number(data.harga),
      id_user :data.id_user,
      id_material :data.id_user,
    });
    if (user) {
      throw redirect(302, "/transaksi");
    }
    console.log(user);
    return user;
  },
  zod$({
    tgl_transaksi: z.string(),
    berat: z.number(),
    harga: z.number(),
    id_user: z.number(),
    id_material: z.number(),
  }),
);
const zodError = createAction?.value?.fieldErrors || null
export default component$(() => {
  const createUserAction = useCreateUser();
  // console.log(createUserAction.value);
  return (
    <section class="card bg-neutral text-neutral-content ">
      <Form class="text-cente card-body items-center" action={createUserAction}>
        <h1 class="card-title">Create User</h1>
        
        <label class="form-control">
          Tanggal Transaksi
          <input
            name="tgl_transaksi"
            class="input input-bordered"
            type="date"
            value={createUserAction.formData?.get("tgl_transaksi")}
          />
        </label>
        
        <label class="form-control">
          Berat
          <input
            name="berat"
            class="input input-bordered"
            type={'number'}
            value={createUserAction.formData?.get("berat")}
          />
        </label>
        
        <label class="form-control">
          Harga
          <input
            type={'number'}
            name="harga"
            class="input input-bordered"
            value={createUserAction.formData?.get("number")}
          />
        </label>
        
        <label class="form-control">
          ID User
          <input
            name="id_user"
            class="input input-bordered"
            value={createUserAction.formData?.get("id_user")}
          />
        </label>
        
        <label class="form-control">
          ID Material
          <input
            name="id_material"
            class="input input-bordered"
            value={createUserAction.formData?.get("id_material")}
          />
        </label>
        
        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>
        </div>
      </Form>
      {!createUserAction.value?.failed && (
        <div>
          <h2>User created successfully!</h2>
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
