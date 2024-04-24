import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { join } from "~/db/join/join";
import { transaksi } from "~/db/transaksi";
import { zodTransaksi } from "~/lib/Zod";

export const useSelectData = routeLoader$(async () => {
  return join.user_material(); // as Promise<Required<SelectDatas>>
});

export const useCreateTransaksi = routeAction$(
  async (data, { redirect, fail }) => {
    const newData = {
      tgl_transaksi: new Date(data.tgl_transaksi),
      // berat: Number(data.berat),
      // harga: Number(data.harga),
      id_user: Number(data.id_user),
      // id_material: Number(data.id_material),
    };
    console.log(newData);
    const user = await transaksi.createOne(newData);
    if (user) {
      throw redirect(302, "/table/transaksi");
    }
    console.log(user);
    return user;
  },
  zodTransaksi,
);

export default component$(() => {
  const createAction = useCreateTransaksi();
  const selectData = useSelectData();
  const zodError = createAction?.value?.fieldErrors || null;
  return (
    <section class="container   ">
      <Heads />

      <div class="card bg-base-100 static">
        <Form class="card-body items-center text-center" action={createAction}>
          <h1 class="card-title">Transaksi User</h1>

          <label class="form-control">
            Tanggal Transaksi
            <input
              name="tgl_transaksi"
              class="input input-bordered"
              type="date"
              value={createAction.formData?.get("tgl_transaksi")}
            />
          </label>

          {/* <label class="form-control">
          Berat
          <input
            name="berat"
            class="input input-bordered"
            type={'number'}
            min="1"
            value={createAction.formData?.get("berat")}
          />
        </label>
         */}
          {/* <label class="form-control">
          Harga
          <input
            
            type={'number'}
            name="harga"
            class="input input-bordered"
            min="1"
            value={createAction.formData?.get("harga")}
          />
        </label> */}

          <label class="form-control">
            <select class="select select-bordered w-full  " name={"id_user"}>
              {/*<option disabled selected>Who shot first?</option>*/}
              {selectData.value.user.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nama || ""}
                </option>
              ))}
            </select>
          </label>

          {/*         
        <label class="form-control">
          <select class="select select-bordered w-full  "
                  name={'id_material'}
          >
            {selectData.value.materials.map(m => (
              <option key={m.id} value={m.id}>{m.nama || ''}</option>
            ))}
          </select>
        </label>
         */}

          <div class="card-actions">
            <button type="submit" class="btn btn-success">
              Create
            </button>
            <Link href="/table/transaksi" class="btn btn-warning">
              Back
            </Link>
          </div>
        </Form>

        {createAction.value?.failed && (
          <>
            {/* {zodError?.berat && <p>Berat {zodError?.berat}</p>}
          {zodError?.harga && <p>Harga {zodError.harga}</p>}
          {zodError?.id_material && <p>ID Material{zodError.id_material}</p>} */}
            {zodError?.id_user && <p>ID User {zodError.id_user}</p>}
            {zodError?.tgl_transaksi && (
              <p>Tanggal Transaksi {zodError.tgl_transaksi}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
});

export const Heads = component$(() => {
  return (
    <>
      <Link class="btn btn-warning btn-xs" href="/user/profile">
        Back
      </Link>
      <Breadcrumbs
        data={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Profile",
            link: "/user/profile/",
          },
          {
            name: "Edit",
            link: "/user/profile/edit",
          },
        ]}
      />
    </>
  );
});
