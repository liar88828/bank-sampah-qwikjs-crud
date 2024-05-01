import { $, Resource, component$, useStore } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { LuShoppingCart, LuX } from "@qwikest/icons/lucide"
import { getDate } from "~/lib/utils/date"
import {
  useActionMaterialBeli,
  useLoadMaterialId,
} from "~/routes/menu/page/material/[id_material]"

export const DetailTransaksi = component$(() => {
  const loadData = useLoadMaterialId()
  const actionData = useActionMaterialBeli()
  const location = useLocation()

  const url = location.url
  const pathName = url.pathname

  const store = useStore({
    show: false,
    jumlah: "",
  })

  const handlerClick = $(() => {
    store.show = !store.show
  })

  const handlerBuy = $(() => {
    actionData.submit({
      jumlah: store.jumlah,
    })
  })

  return (
    <Resource
      value={loadData}
      onResolved={(data) => {
        // const transaksi = data?.User?.userBuy
        return (
          <div class="card static w-full bg-base-100">
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
                  {store.show && (
                    <div class="flex flex-col space-y-1  ">
                      <div class="">
                        <input
                          max={data?.berat}
                          // maxLength={3}
                          type="number"
                          class="input input-bordered"
                          placeholder="Masukkan Jumlah"
                          // bind:value={jumlah}
                          onChange$={(_, el) => {
                            store.jumlah = el.value
                          }}
                          value={store.jumlah}
                        />
                        <button
                          class="btn btn-primary w-fit"
                          onClick$={handlerBuy}
                        >
                          Simpan
                        </button>
                      </div>

                      <div class="mt-2  flex justify-end">
                        <button class="btn btn-error" onClick$={handlerClick}>
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                  {!store.show && (
                    <button class="btn btn-info" onClick$={handlerClick}>
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
                  <h2 class="text-lg font-semibold">Kategori</h2>
                  <p>{data?.kategori}</p>
                </div>

                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <h2 class="text-lg font-semibold">Berat </h2>
                    <div class="flex">
                      {!store.show && (
                        <button
                          class={`btn btn-sm ${!store.show ? "btn-info" : "btn-primary"} `}
                          onClick$={() => {
                            if (!store.show) {
                              handlerClick()
                            }
                          }}
                        >
                          <LuShoppingCart />
                        </button>
                      )}
                      {store.show && (
                        <button
                          class="btn btn-error btn-sm"
                          onClick$={() => (store.show = false)}
                        >
                          <LuX />
                        </button>
                      )}
                    </div>
                  </div>

                  <p>{data?.berat} Kg</p>
                  {store.show && (
                    <div class="flex items-center">
                      <input
                        max={data?.berat}
                        type="number"
                        class="input input-xs input-bordered w-20"
                        placeholder={`Max ${data?.berat}`}
                        // bind:value={jumlah}
                        onChange$={(_, el) => {
                          store.jumlah = el.value
                        }}
                        value={store.jumlah}
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
                  <Link
                    href={`/menu/page/user/${data?.id_user}?callback=${pathName}`}
                    class="link"
                  >
                    <p>{data?.User?.nama ?? ""}</p>
                  </Link>
                </div>
                <div class="space-y-2">
                  <h2 class="text-lg font-semibold">Create at</h2>
                  <p>{getDate(data?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
})
