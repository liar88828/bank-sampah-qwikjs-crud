import { prisma } from "~/config/prisma"
import { type Transaksi } from "@prisma/client"
import { RiwayatPenukaranJoin } from "../join/RiwayatPenukaranUser"

abstract class RiwayatPenukaranMutation extends RiwayatPenukaranJoin(Object) {
  createOne = async (data: Pick<Transaksi, "userBuyId" | "tgl_transaksi">) => {
    return prisma.transaksi.create({
      data: {
        tgl_transaksi: data.tgl_transaksi,
        userBuyId: data.userBuyId,
      },
    })
  }

  updateOne = async (
    id: number,
    data: { tgl_transaksi: Date; id_material: number; id_user: string },
  ) => {
    return prisma.transaksi.update({
      where: {
        id: id,
      },
      data: {
        tgl_transaksi: data.tgl_transaksi,
        userBuyId: data.id_user,
      },
    })
  }

  deleteOne = async (id: number) => {
    return prisma.transaksi.delete({ where: { id } })
  }
}

class RiwayatPenukaran extends RiwayatPenukaranMutation {
  // implements IPrismaOperator<LoaderRiwayat_Penukaran>
  findAll = async () => {
    return prisma.transaksi.findMany({
      include: {
        // userSell: {
        //   select: {
        //     id: true,
        //     nama: true,
        //   },
        // },
        Opsi: {
          where: { typeOpsiId: "Penukaran" },
          select: {
            id: true,
            deskripsi: true,
          },
        },
      },
    })
  }

  findId = async (id: number) => {
    return prisma.transaksi.findUnique({
      where: { id },

      include: {
        // userSell: {
        //   select: {
        //     id: true,
        //     nama: true,
        //   },
        // },
        Opsi: {
          where: { typeOpsiId: "Penukaran" },

          select: {
            id: true,
            deskripsi: true,
          },
        },
      },
    })
  }
}

export const riwayatPenukaran = new RiwayatPenukaran()
