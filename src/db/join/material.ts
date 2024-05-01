import { prisma } from "~/config/prisma"
import type { Constructor } from "~/type/global/global.type"
import type { DataMaterial } from "~/type/db/join.type"

export function MaterialJoin<T extends Constructor<{}>>(SuperClass: T) {
  return class extends SuperClass {
    // constructor(...args: any[]) {
    //   super(...args)
    // }

    // export abstract class MaterialJoin {
    findId_Relations = async (id: number): Promise<DataMaterial> => {
      return prisma.material.findUnique({
        where: { id },
        select: {
          berat: true,
          kategori: true,
          nama: true,
          id: true,
          id_user: true,
          createdAt: true,
          User: {
            select: {
              nama: true,

              userBuy: {
                select: {
                  tgl_transaksi: true,
                  id: true,
                },
              },

              // userSell: {
              //   select: {
              //     tgl_transaksi: true,
              //     id: true,
              //   },
              // },
            },
          },

          // Transaksi: {
          //   select: {
          //     id: true,
          //     tgl_transaksi: true,
          //     id_user: true,
          //     User: {
          //       select: {
          //         nama: true,
          //       },
          //     },
          //   },
          // },
        },
      })
    }
  }
}
