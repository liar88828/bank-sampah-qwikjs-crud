/*
// will save
- riwayat {
  transaksi
  pengiriman
}
// will write
- nomor anggota
- Jenis sampah {
  nama
  jenis
  berat
}
 
 */

import { $, type QRL, component$, useStore } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { prisma } from "~/db/prisma";
import { user } from "~/db/users";

export const useLoadData = routeLoader$(async ({ query }) => {
  return {
    user: await user.findAll(),
    queryData: {
      id_user: query.get("id_user"),
      id_material: query.get("id_material"),
      status: query.get("status"),
      nama_sampah: query.get("sampah.0.nama"),
      jenis_sampah: query.get("sampah.0.jenis"),
      berat_sampah: query.get("sampah.0.berat"),
    },
  };
});

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    console.log(data);
    const res = false; //work()
    if (res) {
      throw redirect(302, "/table/users");
    }
    return { form: data };
  },
  zod$({
    id_user: z.string(),
    status: z.string(),
    sampah: z.array(
      z.object({
        nama: z.string().min(3).max(20),
        jenis: z.string().min(3).max(20),
        berat: z.string().min(1),
      }),
    ),
  }),
);
type SampahStore = {
  list: {
    id: number;
    berat: number;
    jenis: string;
    nama: string;
  }[];
  increment: QRL<(this: SampahStore) => void>;
};
const defaultValue = {
  id: 0,
  berat: 0,
  jenis: "",
  nama: "",
  status: "",
};
type CountStore = { count: number; increment: QRL<(this: CountStore) => void> };

export default component$(() => {
  const createUserAction = useCreateUser();
  const {
    value: { queryData: query, user: selectAnggota },
  } = useLoadData();

  const listSampah = useStore<SampahStore>({
    list: [defaultValue],
    increment: $(function (this: SampahStore) {
      defaultValue.id = this.list.length + 1;
      this.list.push(defaultValue);
    }),
  });

  const state = useStore<CountStore>({
    count: 0,
    increment: $(function (this: CountStore) {
      this.count++;
    }),
  });

  const handlerAdd = $(() => listSampah.increment());
  const handlerRemove = $((id: number) => {
    // listSampah.list = listSampah.list.filter((a, i) => {
    //   console.log(i, id, i === id);
    //   return i !== id;
    // });


    listSampah.list.forEach((item, index) => {
      if (index === id) {
        listSampah.list.splice(index, 1);
      }
  });
   
    console.log()
  });

  // const removeList = $((id: number) => {
  //   const index = listSampah.list.findIndex((a, i) => {
  //     // console.log(i, "i");
  //     // console.log(index, "index");

  //     return a.id === id;
  //   });
  //   console.log(index);
  //   const data = listSampah.list.splice(index, 1);
  //   console.log(data);
  // });
  // console.log(listSampah);
  return (
    <section class="card bg-base-300 ">
      <Form
        class="card-body items-center text-center"
        action={createUserAction}
      >
        <h1 class="card-title">Create User</h1>

        <button type="button" onClick$={handlerAdd} class="btn btn-info">
          Add
        </button>

        <label class="form-control">
          ID Anggota
          <input
            //@ts-ignore
            list="id-user"
            type="text"
            class="input input-bordered"
            name={"id_user"}
            value={query.id_user || createUserAction.formData?.get(`id_user`)}
          />
          <datalist id="id-user">
            {selectAnggota.map((d, i) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.nama || ""}
              </option>
            ))}
          </datalist>
        </label>

        {/* <label class="form-control">
          Material
          <input
            //@ts-ignore
            list="id-id_material"
            type="text"
            class="input input-bordered"
            name={"id_material"}
            value={query.id_material}
          />
          <datalist id="id-user">
            {selectAnggota.map((d) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.nama || ""}
              </option>
            ))}
          </datalist>
        </label> */}

        <label class="form-control" for="status">
          Status
          <select
            value={
              (query.status as string) ||
              (createUserAction.formData?.get(`status`) as string)
            }
            id="status"
            class="select select-bordered"
            name={"status"}
          >
            {["SIMPAN", "PROCESS", "SELESAI"].map((d) => (
              <option value={d} key={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        {listSampah.list.map((d, i) => (
          <div key={d.id + i} class="no-wrap flex bg-base-200 p-5">
            <label class="form-control">
              Nama Sampah
              <input
                name={`sampah.${i}.nama`}
                class="input input-bordered"
                value={
                  query.nama_sampah ||
                  createUserAction.formData?.get(`sampah.${i}.nama`)
                }
              />
            </label>

            <label class="form-control">
              Jenis Sampah
              <input
                name={`sampah.${i}.jenis`}
                class="input input-bordered"
                value={
                  query.jenis_sampah ||
                  createUserAction.formData?.get(`sampah.${i}.jenis`)
                }
              />
            </label>

            <label class="form-control">
              Berat Sampah
              <input
                type="number"
                name={`sampah.${i}.berat`}
                class="input input-bordered"
                value={
                  query.berat_sampah ||
                  createUserAction.formData?.get(`sampah.${i}.berat`)
                }
              />
            </label>
            <button
              type="button"
              onClick$={() => {
                handlerRemove(i);
                // console.log("test");
              }}
              class="btn btn-info"
            >
              Delete
            </button>
          </div>
        ))}

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>
        </div>
      </Form>
    </section>
  );
});

// preventdefault:click
{
  /* <form onSubmit$={handleSubmit} preventdefault:click>
<input name="person.name" value="Sam" />
<input name="person.email" value="sam@complexform.com" />
<input name="person.pets.0" value="cat" />
<input name="person.pets.1" value="dog" />
<input name="person.address.street" value="1234 Example Ave." />
<input name="person.address.city" value="Qwik" />
<input name="person.address.state" value="IA" />
<input name="person.address.zip" value="00000" />
<input name="person.pets.0" value="beaver" />
<input name="person.1.name" value="Bonnie" />
<input name="person.1.email" value="bonnie@hishai.net" />
<input name="person.1.address.street" value="768 Resolution Way" />
<input name="person.1.address.city" value="Jaffa" />
<input name="person.1.address.state" value="IL" />
<input name="person.1.address.zip" value="01948" />
<button>Save</button>
</form> */
}
