import type { Material } from "@prisma/client"
import { MaterialJoin } from "../join/material"
import { prisma } from "~/config/prisma"
import type { PaginationType } from "~/type/controller/PaginationType"

export class MaterialWork extends MaterialJoin(Object) {
  findMaterialKeluar = async ({
    id,
    page = 0,
  }: PaginationType<string, unknown>): Promise<Material[]> => {
    const limit = 100

    return prisma.material.findMany({
      where: {
        id_user: id,
        User: {
          userBuy: {
            every: {
              id_status: "PROCESS",
            },
          },
        },
      },

      take: 100,
      skip: page * limit,
    })
  }
}
