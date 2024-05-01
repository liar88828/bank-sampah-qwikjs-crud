import { prisma } from "~/config/prisma"
import { MaterialMenu } from "./material"
import type { ControlPaginationReturn } from "~/type/controller/PaginationType"
import type { User } from "@prisma/client"

class Menu extends MaterialMenu {
  userSearch = async ({
    search,
    page,
  }: ControlPaginationReturn<unknown>): Promise<User[]> => {
    return prisma.user.findMany({
      where: {
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * Number(page),
    })
  }

  async materialGroup() {
    return prisma.material.groupBy({
      by: "kategori",
      _sum: {
        berat: true,
      },
      _count: {
        kategori: true,
      },
    })
  }

  async KategoriMaterial() {
    return prisma.katergory.findMany()
  }
}

export const menu = new Menu()
