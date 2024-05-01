import type { Session } from "@auth/core/types"
import type { Constructor } from "~/type/global/global.type"
import { db } from "~/db/db"

export function TrollyController<T extends Constructor<{}>>(SuperClass: T) {
  return class extends SuperClass {}
}
