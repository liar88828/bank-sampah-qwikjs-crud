import { prisma } from "~/config/prisma"
import { RiwayatPenukaranCart } from "./riwayatPenukaran"
import { MaterialJoin } from "../join/material"
import { type PaginationType } from "~/type/controller/PaginationType"
import { type MaterialCartReturn } from "~/type/db/cart.type"

export class MaterialCart extends MaterialJoin(RiwayatPenukaranCart) {
  findMaterialTransaksi = async ({
    id,
    page = 0,
  }: PaginationType<string, unknown>): Promise<MaterialCartReturn[]> => {
    const limit = 100

    return prisma.material.findMany({
      where: {
        id_user: id,
      },
      include: {
        Cart_List: true,
      },

      take: 100,
      skip: page * limit,
    })
  }

  deleteOne = async (id: number) => {
    const material = await prisma.material.delete({ where: { id } })
    return material
  }
}
