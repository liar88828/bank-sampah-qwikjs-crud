import { type QRL } from "@builder.io/qwik"
import type { TCheckoutAction } from "../controller/TCheckOut"
import type { PropsCart } from "../db/cart.type"

export type PropsCartTrolly = {
  handlerDelete: QRL<(id: number) => Promise<void>>
  handlerCheckOut: QRL<(dataCheckout: TCheckoutAction) => Promise<void>>
  loading: boolean
} & PropsCart
