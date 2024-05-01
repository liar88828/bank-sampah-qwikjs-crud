import { prisma } from "~/config/prisma"
import { type Constructor } from "~/type/global/global.type"
import { type PaginationType } from "~/type/controller/PaginationType"
import { type TransaksiUser } from "~/type/db/join.type"

export function RiwayatPenukaranJoin<T extends Constructor<{}>>(SuperClass: T) {
  return class extends SuperClass {
    findAllUser = async ({
      id,
      page = 0,
    }: PaginationType<string>): Promise<TransaksiUser[]> => {
      const limit = 100
      // console.log(id)
      return prisma.transaksi.findMany({
        where: {
          userBuyId: id,
          // Opsi: {
          //   typeOpsiId: "Penukaran",
          // },
        },
        include: {
          userBuy: true,
          Opsi: {
            include: {
              Cases: {
                include: {
                  Material: true,
                },
              },
            },
          },
        },
        take: 100,
        skip: page * limit,
      })
    }

    riwayatPenukaran = async (id: number) => {
      return prisma.transaksi.findMany({
        where: {
          id: id,
          Opsi: {
            typeOpsiId: "Penukaran",
          },
        },
        include: {
          Opsi: true,
          userBuy: true,
        },
      })
    }
  }
}
