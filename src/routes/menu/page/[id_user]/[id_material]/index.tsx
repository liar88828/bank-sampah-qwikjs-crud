import { $, Resource, component$, useSignal } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { LuShoppingCart, LuX } from "@qwikest/icons/lucide";
import { prisma } from "~/config/prisma";
import { material } from "~/db/material";
import { getDate } from "~/lib/date";
export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  return material.findId_Relations(Number(params.id_material));
});

export const useActionMaterialBeli = routeAction$(
  async (_data, { sharedMap, params }) => {
    const id = Number(params.id_material);
    const jumlah = Number(_data.jumlah);

    return prisma.$transaction(async (tx) => {
      const material = await tx.material.findUnique({ where: { id } });

      if (!material) {
        return {
          error: "Material not found",
        };
      }
      if (material.berat < jumlah) {
        return {
          error: "Material Berat is Valid",
        };
      }
      const transaksi = await tx.material.update({
        where: { id },
        data: {
          berat: {
            decrement: jumlah,
          },
        },
      });

      return {
        transaksi,
        material,
      };
    });
  },
  zod$({
    jumlah: z.string(),
  }),
);
export default component$(() => {
  return (
    <div class="container space-y-5">
      <Link href="/menu/page" class="btn btn-warning">
        Back
      </Link>
      <ProfileMaterial />
    </div>
  );
});

export const ProfileMaterial = component$(() => {
  const loadData = useLoadMaterialId();
  const actionData = useActionMaterialBeli();
  const show = useSignal(false);
  const jumlah = useSignal("");
  const handlerBuy = $(() => {
    actionData.submit({
      jumlah: jumlah.value,
    });
  });

  return (
    <Resource
      value={loadData}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        const transaksi = data?.Sampah_Transaksi?.Transaksi;
        return (
          <div class="static card w-full bg-base-100">
            <div class="card-body space-y-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-6">
                  <div class="relative mr-2 h-12 w-12 overflow-hidden rounded-full">
                    <img
                      class="rounded-full object-cover"
                      height="64"
                      src="https://picsum.photos/200/200"
                      width="64"
                      alt='avatar "Jane Doe"'
                    />
                  </div>

                  <div class="space-y-1.5">
                    <h1 class="text-2xl font-bold">{data?.nama}</h1>
                    <p class="text-gray-500 dark:text-gray-400">
                      # id : {data?.id}
                    </p>
                  </div>
                </div>
                <div class="flex items-center ">
                  {show.value && (
                    <div class="flex flex-col space-y-1  ">
                      <div class="">
                        <input
                          max={data?.berat}
                          // maxLength={3}
                          type="number"
                          class="input input-bordered"
                          placeholder="Masukkan Jumlah"
                          bind:value={jumlah}
                          value={jumlah.value}
                        />
                        <button
                          class="btn btn-primary w-fit"
                          onClick$={handlerBuy}
                        >
                          Simpan
                        </button>
                      </div>

                      <div class="mt-2  flex justify-end">
                        <button
                          class="btn btn-error"
                          onClick$={() => (show.value = !show.value)}
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                  {!show.value && (
                    <button
                      class="btn btn-info"
                      onClick$={() => (show.value = !show.value)}
                    >
                      Beli
                    </button>
                  )}
                </div>
              </div>
              <div class="space-y-2 text-sm leading-loose md:text-base">
                <p>
                  Product designer passionate about creating beautiful and
                  user-friendly interfaces. Currently working at Acme
                  Corporation.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
                <div class="space-y-2">
                  <h2 class="text-lg font-semibold">Jenis</h2>
                  <p>{data?.jenis}</p>
                </div>

                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <h2 class="text-lg font-semibold">Berat </h2>
                    <div class="flex">
                      {!show.value && (
                        <button
                          class={`btn btn-sm ${!show.value ? "btn-info" : "btn-primary"} `}
                          onClick$={() => {
                            if (!show.value) {
                              show.value = !show.value;
                            }
                          }}
                        >
                          <LuShoppingCart />
                        </button>
                      )}
                      {show.value && (
                        <button
                          class="btn btn-error btn-sm"
                          onClick$={() => (show.value = false)}
                        >
                          <LuX />
                        </button>
                      )}
                    </div>
                  </div>

                  <p>{data?.berat} Kg</p>
                  {show.value && (
                    <div class="flex items-center">
                      <input
                        max={data?.berat}
                        type="number"
                        class="input input-xs input-bordered w-20"
                        placeholder={`Max ${data?.berat}`}
                        bind:value={jumlah}
                        value={jumlah.value}
                      />
                      {/* <p>Kg</p> */}

                      <button
                        class={`btn btn-primary btn-xs `}
                        onClick$={handlerBuy}
                      >
                        <LuShoppingCart />
                      </button>
                    </div>
                  )}
                </div>
                <div class="space-y-2 ">
                  <h2 class="text-lg font-semibold">Owner</h2>
                  <Link href={`/menu/page/${transaksi?.id_user}`} class="link">
                    <p>{transaksi?.User?.nama}</p>
                  </Link>
                </div>
                <div class="space-y-2">
                  <h2 class="text-lg font-semibold">Create at</h2>
                  <p>{getDate(transaksi?.tgl_transaksi)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
});
