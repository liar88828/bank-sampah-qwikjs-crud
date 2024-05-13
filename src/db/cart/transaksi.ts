import { prisma } from "~/config/prisma"
import { type PaginationType } from "~/type/controller/PaginationType"
import { type Constructor } from "~/type/global/global.type"

export function CartTransaksi<T extends Constructor<{}>>(SuperClass: T) {
  return class extends SuperClass {
    findAllUsers = async ({ id, page = 0 }: PaginationType<string, Object>) => {
      const limit = 100

      return prisma.transaksi.findMany({
        where: {
          userBuyId: id,
        },

        include: {
          userBuy: {
            select: {
              nama: true,
            },
          },

          Opsi: {
            include: { _count: true },
          },
        },

        take: 100,
        skip: page * limit,
      })
    }
  }
}
