import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { control } from "~/controller/controller"
import { zodUser } from "~/lib/zod/profile/zodUser"
import { db } from "~/db/db"
import { type Session } from "@auth/core/types"

export const useCreateUser = globalAction$(async (data, { redirect }) => {
  const res = await db.users.createOne(control.user.sanitize(data))

  if (res) {
    throw redirect(302, `/user/profile/`)
  }
  return res
}, zodUser)
// UPDATE -------------
export const useUpdateUser = globalAction$(
  async (data, { redirect, sharedMap }) => {
    const session: Session = sharedMap.get("session")
    const res = await db.users.updateOne(
      session?.user.id,
      control.user.sanitize(data),
    )
    if (res) {
      throw redirect(302, `/user/profile/`)
    }
    return res
  },
  zodUser,
)

// DELETE ------------
export const useDeleteUsers = globalAction$(
  async (data, { redirect }) => {
    const res = await db.users.deleteOne(data.id)
    if (res) {
      throw redirect(302, "/table/users")
    }
    return res
  },
  zod$({ id: z.string() }),
)

export const useDeleteUserOnly = globalAction$(
  async (data) => {
    return db.users.deleteOne(data.id)
  },
  zod$({ id: z.string() }),
)
