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

import { $, component$ } from "@builder.io/qwik";
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
      nama_sampah: query.get("sampah.0.nama"),
      jenis_sampah: query.get("sampah.0.jenis"),
      berat_sampah: query.get("sampah.0.berat"),
    },
  };
});

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    // console.log(data);
    const res = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: Number(data.id_user) },
      });

      const transaksi = await tx.transaksi.create({
        data: {
          berat: Number(data.sampah.berat),
          harga: 0,
          tgl_transaksi: new Date(),
          id_user: user?.id,
        },
      });
    });
    //   if (res) {
    //     throw redirect(302, "/table/users");
    //   }
    //   return res;
  },
  zod$({
    id_user: z.string(),
    sampah: z.object({
      nama: z.string().min(3).max(20),
      jenis: z.string().min(3).max(20),
      berat: z.string().min(1),
    }),
  }),
);
export default component$(() => {
  const createUserAction = useCreateUser();
  const {
    value: { queryData: query, user: selectAnggota },
  } = useLoadData();
  // const { value: query } = useGetQuery();
  // console.log(query);

  return (
    <section class="card bg-base-300 ">
      <Form
        class="card-body items-center text-center"
        action={createUserAction}
      >
        <h1 class="card-title">Create User</h1>

        <label class="form-control">
          ID Anggota
          <input
            //@ts-ignore
            list="id-user"
            type="text"
            class="input input-bordered"
            name={"id_user"}
            value={query.id_user}
          />
          <datalist id="id-user">
            {selectAnggota.map((d) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.nama || ""}
              </option>
            ))}
          </datalist>
        </label>

        <label class="form-control">
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
        </label>

        <label class="form-control">
          Nama Sampah
          <input
            name="sampah.nama"
            class="input input-bordered"
            value={
              query.nama_sampah || createUserAction.formData?.get("sampah.nama")
            }
          />
        </label>

        <label class="form-control">
          Jenis Sampah
          <input
            name="sampah.jenis"
            class="input input-bordered"
            value={
              query.jenis_sampah ||
              createUserAction.formData?.get("sampah.jenis")
            }
          />
        </label>

        <label class="form-control">
          Berat Sampah
          <input
            name="sampah.berat"
            class="input input-bordered"
            value={
              query.berat_sampah ||
              createUserAction.formData?.get("sampah.berat")
            }
          />
        </label>

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
