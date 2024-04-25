import { $, Resource, component$, useStore } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { works } from "~/db/work/work";
import { zodPenyerahanSampah } from "~/lib/Zod";
import { SampahStore, TPenyerahanSampah } from "~/type/penyerahan-sampah.type";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Session } from "@auth/core/types";
import { getDate } from "~/lib/date";

export const useLoadData = routeLoader$(async ({ query, sharedMap }) => {
  const session = sharedMap.get("session") as Session;
  return {
    user: session.user,
    status: query.get("status"),
    nama_sampah: query.get("sampah.0.nama"),
    jenis_sampah: query.get("sampah.0.jenis"),
    berat_sampah: query.get("sampah.0.berat"),
  };
});


export const  penyerahanController = () => {
  
}
export const useCreatePenyerahan = routeAction$(
  async (data, { redirect, fail, sharedMap }) => {
    const session = sharedMap.get("session") as Session;

    const newData: TPenyerahanSampah = {
      ...data,
      id_user: Number(session.user.id),
      status: "SIMPAN",
    };
    console.log("send data", newData);
    const res = await works.transaksi().penyerahanSampah(newData);
    console.log("get data base", res);
    if (!res) {
      console.log("fail create data");
      return fail(500, {
        message: "User could not be added",
      });
    } else if (res) {
      console.log("success create data");
      throw redirect(302, "/user/penyerahan");
    } else {
      console.log("may be error");
      return { form: data };
    }
  },
  zodPenyerahanSampah,
);

export default component$(() => {
  return (
    <section class="container space-y-3">
      <Heads />
      <Forms />
    </section>
  );
});

export const Heads = component$(() => {
  return (
    <>
      {/* <Link class="btn btn-warning btn-xs" href="/user/profile">
        Back
      </Link> */}

      <Breadcrumbs data={getBreadcrumbTrail("Table Penyerahan")} />
    </>
  );
});

export const Forms = component$(() => {
  const dataLoad = useLoadData();

  const listSampah = useStore<SampahStore>({
    list: [{ id: 0, berat: 0, jenis: "", nama: "" }],

    remove: $(function (this: SampahStore, index: number) {
      const newData = this.list.filter((item) => item.id !== index);
      this.list = newData;
    }),

    add: $(function (this: SampahStore) {
      const newSampah = [
        ...this.list,
        { id: this.list.length + 1, berat: 0, jenis: "", nama: "" },
      ];
      this.list = newSampah;
    }),
  });

  const action = useCreatePenyerahan();

  const handlerAdd = $(() => {
    listSampah.add();
  });

  const handlerRemove = $((i: number) => {
    listSampah.remove(i);
  });

  return (
    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        console.log(data.user);
        const time = getDate(new Date());
        return (
          <div class="card static bg-base-100">
            <Form
              class="card-body items-center "
              action={action}
              // onSubmitCompleted$={() => {
              //   action.value
              // }}
            >
              <h1 class="card-title">Penyerahan Sampah</h1>
              <div class="grid grid-cols-3 gap-5">
                <h2>Nama : {data.user?.name}</h2>
                <h2>Date : {time}</h2>
                <h2>Status : Terima </h2>
              </div>

              {listSampah.list.map((d, i) => (
                <div key={d.id} class="rounded bg-base-200  p-5 ">
                  <div class="text-left">
                    <span class="badge badge-primary">List : {i + 1}</span>
                  </div>
                  <div class="flex flex-wrap justify-center gap-2 sm:justify-normal">
                    <label class="form-control">
                      Nama Sampah
                      <input
                        name={`sampah.${i}.nama`}
                        class="input input-xs input-bordered sm:input-md"
                        value={
                          data.nama_sampah ||
                          action.formData?.get(`sampah.${i}.nama`)
                        }
                      />
                    </label>

                    <label class="form-control">
                      Jenis Sampah
                      <input
                        name={`sampah.${i}.jenis`}
                        class="input input-xs input-bordered sm:input-md"
                        value={
                          data.jenis_sampah ||
                          action.formData?.get(`sampah.${i}.jenis`)
                        }
                      />
                    </label>

                    <label class="form-control">
                      Berat Sampah
                      <input
                        type="number"
                        name={`sampah.${i}.berat`}
                        class="input input-xs input-bordered sm:input-md"
                        value={
                          data.berat_sampah ||
                          action.formData?.get(`sampah.${i}.berat`)
                        }
                      />
                    </label>
                  </div>
                  <div class="mt-2 flex justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick$={() => handlerRemove(d.id)}
                      class="btn btn-info btn-xs sm:btn-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <div class="card-actions">
                <Link class="btn btn-warning" href="/user/profile">
                  Back
                </Link>

                {/* <div class="flex items-center gap-5"> */}
                <button
                  type="button"
                  onClick$={handlerAdd}
                  class="btn btn-info "
                >
                  Add List
                </button>
                {/* </div> */}

                <button type="submit" class="btn btn-success">
                  Create
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    />
  );
});

export type FormDataList = {
  status: string | null;
  nama_sampah: string | null;
  jenis_sampah: string | null;
  berat_sampah: string | null;
};

// [
//   {
//     name: "Home",
//     link: "/",
//   },
//   {
//     name: "Profile",
//     link: "/user/profile/",
//   },
//   {
//     name: "Penyerahan",
//     link: "/user/profile/penyerahan",
//   },
// ]
