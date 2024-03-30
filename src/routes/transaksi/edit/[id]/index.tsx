import {component$, Resource} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$,} from "@builder.io/qwik-city";
import {join} from "~/db/join";
import {transaksi} from "~/db/transaksi";
import {getDate} from "~/lib/date";
import {zodTransaksi} from "~/lib/Zod";

export const useSelectData = routeLoader$(async () => {
  return join.user_material()
})

export const useGetTransaksi = routeLoader$(async ({params, status}) => {
  const id = parseInt(params["id"], 10);
  const user = await transaksi.findId(id);
  if (!user) {
    status(404);
  }
  return user;
});

export const useUpdateTransaksi = routeAction$(
  async (data, {redirect, params}) => {
    const id = Number(params["id"]);
    
    const newData = {
      tgl_transaksi: new Date(data.tgl_transaksi),
      berat: Number(data.berat),
      harga: Number(data.harga),
      id_user: Number(data.id_user),
      id_material: Number(data.id_material),
    }
    
    const user = await transaksi.updateOne(id, newData);
    if (user) {
      throw redirect(302, `/transaksi/detail/${id}`);
    }
    
    return user;
  },
  zodTransaksi
);

export default component$(() => {
  const updateAction = useUpdateTransaksi();
  const transaksiData = useGetTransaksi();
  const selectData = useSelectData()
  
  
  console.log(updateAction.value);
  const zodError = updateAction?.value?.fieldErrors || null
  
  return (
    <section class="card bg-neutral text-neutral-content ">
      <Resource
        value={transaksiData}
        onPending={() => <span class="loading loading-spinner"></span>}
        onResolved={(transaksi) => (<>
            
            
            <Form
              class="text-cente card-body items-center"
              action={updateAction}
            >
              <h1 class="card-title">Update Transaksi :
                {getDate(transaksiData.value?.tgl_transaksi || new Date())}
              </h1>
              
              <label class="form-control">
                Tanggal Transaksi
                <input
                  name="tgl_transaksi"
                  class="input input-bordered"
                  type="date"
                  // value={
                  //   transaksi?.tgl_transaksi ||
                  //   updateAction.formData?.get("tgl_transaksi")||''
                  // }
                />
              </label>
              
              <label class="form-control">
                Berat
                <input
                  name="berat"
                  class="input input-bordered"
                  type={'number'}
                  min="1"
                  value={
                    transaksi?.berat ||
                    updateAction.formData?.get("berat")}
                />
              </label>
              
              <label class="form-control">
                Harga
                <input
                  
                  type={'number'}
                  name="harga"
                  class="input input-bordered"
                  min="1"
                  value={
                    transaksi?.harga ||
                    updateAction.formData?.get("harga") ||
                    0}
                />
              </label>
              
              <label class="form-control">
                <select class="select select-bordered w-full "
                        name={'id_user'}
                        // value={    transaksi?.id_user||'' }
                >
                  {selectData.value.user.map(u => (
                    <option key={u.id} value={u.id}>{u.nama || ''}</option>
                  ))}
                </select>
              </label>
              
              
              <label class="form-control">
                <select class="select select-bordered w-full  "
                        name={'id_material'}
                >
                  {selectData.value.materials.map(m => (
                    <option key={m.id} value={m.id}>{m.nama || ''}</option>
                  ))}
                </select>
              </label>
              
              
              <div class="card-actions">
                <button type="submit" class="btn btn-success">
                  Update
                </button>
                
                <Link
                  href={`/transaksi/detail/${transaksiData.value?.id}`}
                  class="btn btn-primary "
                >
                  Back
                </Link>
              </div>
            </Form>
          </>
        )}
      />
      
      
      {!updateAction.value?.failed && (
        <div>
          <h2>User Update successfully!</h2>
        </div>
      )}
      
      {updateAction.value?.failed && (<>
          {zodError?.berat && <p>Berat {zodError?.berat}</p>}
          {zodError?.harga && <p>Harga {zodError.harga}</p>}
          {zodError?.id_user && <p>ID User {zodError.id_user}</p>}
          {zodError?.tgl_transaksi && <p>Tanggal Transaksi {zodError.tgl_transaksi}</p>}
          {zodError?.id_material && <p>ID Material{zodError.id_material}</p>}
        </>
      )}
    </section>
  
  );
});
