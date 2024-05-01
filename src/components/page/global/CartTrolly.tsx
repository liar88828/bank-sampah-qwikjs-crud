import { component$, useSignal } from "@builder.io/qwik"
import { LuXCircle } from "@qwikest/icons/lucide"
import { kiloGram } from "~/lib/utils/formatWeight"
import { getRupiah } from "~/lib/utils/number"
import { type PropsCartTrolly } from "~/type/hook/PropsCartTrolly"

export const CartTrolly = component$(
  ({
    totalBerat,
    totalCart,
    totalHarga,
    data,
    loading,
    handlerCheckOut,
    handlerDelete,
  }: PropsCartTrolly) => {
    const signal = useSignal("")

    return (
      <div class="card card-normal static md:card-compact lg:card-normal ">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-bold">Cart</h2>
            <div class="text-gray-500">{totalCart} items</div>
          </div>
          <div class="space-y-4">
            {data?.Cases.map(({ Material: d, id, berat }) => (
              <div key={d?.id} class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div>
                    <div class="font-medium">{d?.nama}</div>
                    <div class="text-gray-500">{kiloGram(berat ?? 0)}</div>
                  </div>
                </div>
                <button
                  class={`btn btn-square btn-primary h-8 w-8  ${loading && "btn-disabled"}`}
                  onClick$={() => handlerDelete(id)}
                >
                  <LuXCircle font-size={20} />
                </button>
              </div>
            ))}
          </div>
          <div class="my-4" />
          <div>
            <div class="">
              <textarea
                placeholder="deskripsi"
                class="textarea textarea-primary w-full"
                value={signal.value}
                bind:value={signal}
              ></textarea>
            </div>
            <div class="flex items-center justify-between">
              <h1 class="font-bold">Total</h1>
              <dd>
                <div class="font-medium">{kiloGram(totalBerat)}</div>
                <div class="font-medium">{getRupiah(totalHarga)}</div>
              </dd>
            </div>
          </div>

          <button
            onClick$={() =>
              handlerCheckOut({
                id_trolly: data?.id ?? 1,
                // id_seller: data?.id,
                totalBerat,
                totalHarga,
                deskripsi: signal.value,
              })
            }
            class={`btn btn-info ${loading && "btn-disabled"}`}
          >
            Checkout
          </button>
        </div>
      </div>
    )
  },
)
