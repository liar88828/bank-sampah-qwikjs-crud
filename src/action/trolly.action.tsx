import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { db } from "~/db/db"

// DELETE ---------------
export const useDeleteTransaksi = globalAction$(
  async (data) => {
    return db.profile.deleteOne(Number(data.id))
  },
  zod$({ id: z.string() }),
)
