import { $, Resource, component$, useStore } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { useCreatePenyerahan, useLoadData } from "./layout";
import { SampahStore } from "~/type/penyerahan-sampah.type";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";

export default component$(() => {
  const action = useCreatePenyerahan();
  const dataLoad = useLoadData();
  // console.log(action.value);
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

  const handlerAdd = $(() => {
    listSampah.add();
  });

  const handlerRemove = $((i: number) => {
    listSampah.remove(i);
  });

  return (
    <section class="space-y-3">
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
            name: "Penyerahan",
            link: "/user/profile/penyerahan",
          },
        ]}
      />
      <Resource
        value={dataLoad}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => (
          <div class="card static bg-base-100">
            <Form
              class="card-body items-center text-center"
              action={action}
              // onSubmitCompleted$={() => {
              //   action.value
              // }}
            >
              <h1 class="card-title">Penyerahan Sampah</h1>

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
        )}
      />
    </section>
  );
});
