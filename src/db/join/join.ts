import { prisma } from "~/config/prisma"
import { OpsiPenukaran } from "../table/opsiPenukaran"

export type UserSelect = {
  user: {
    id: string
    nama: string
  }[]
  materials: {
    id: number
    nama: string
  }[]
}

class Join extends OpsiPenukaran {
  user_material = async (): Promise<UserSelect> => {
    return prisma.$transaction(async (tx) => {
      const materials = await tx.material.findMany({
        select: {
          id: true,
          nama: true,
        },
      })
      const user = await tx.user.findMany({
        select: {
          id: true,
          nama: true,
        },
      })

      return { user, materials }
    })
  }
}

export const join = new Join()
