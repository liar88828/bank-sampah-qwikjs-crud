import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { type Session } from "@auth/core/types"
import { zodMaterial } from "~/lib/zod/Zod"
import { control } from "~/controller/controller"
import { db } from "~/db/db"

// CREATE
export const useCreateMaterial = globalAction$(
  async (data, { sharedMap, fail }) => {
    const session = sharedMap.get("session") as Session
    const res = await db.material.createOne(
      control.material.sanitize(session, data),
    )
    if (res) {
      return fail(500, { message: "Material could not be added" })
    }

    return res
  },
  zodMaterial,
)

export const useCreateMaterialTable = globalAction$(
  async (data, { redirect, sharedMap }) => {
    const session = sharedMap.get("session") as Session
    const res = await db.material.createOne(
      control.material.sanitize(session, data),
    )
    if (res) {
      throw redirect(302, "/table/material")
    }

    return res
  },
  zodMaterial,
)
// UPDATE------------------
export const useUpdate = globalAction$(
  async (data, { redirect, params, sharedMap }) => {
    const id = Number(params["id"])
    const session = sharedMap.get("session") as Session
    const res = await db.material.updateOne(
      id,
      control.material.sanitize(session, data),
    )
    if (res) throw redirect(302, `/table/material/detail/${id}`)
    console.log(res)
    return res
  },
  zodMaterial,
)

// ----------------DELETE
export const useDelete = globalAction$(
  async (data, { redirect }) => {
    const res = await db.material.deleteOne(Number(data.id))
    if (res) {
      throw redirect(302, "/table/material")
    }
    return res
  },
  zod$({ id: z.number() }),
)

export const useDeleteUserMaterial = globalAction$(
  async (data, { fail }) => {
    const res = await db.profile.deleteOne(data.id)

    if (res) {
      return fail(500, { message: "Material could not be deleted" })
    }
    return res
  },
  zod$({ id: z.number() }),
)
