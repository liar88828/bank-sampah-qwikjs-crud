import type { PropsProfile, TUser } from "../db/cart.type"

export type PropsProfileLoader = PropsProfile & {
  user: TUser & {
    createdAt: Date
  }
}
