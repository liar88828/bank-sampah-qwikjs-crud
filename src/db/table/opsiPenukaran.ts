import { type IPrismaOperator } from "~/type/global/IPrismaOperator"
import { type Opsi } from "@prisma/client"
import type { CreateOpsi } from "~/type/db/table.type"
import { prisma } from "~/config/prisma"

abstract class OpsiPenukaranMutation {
  createOne = async (data: CreateOpsi) => {
    return prisma.opsi.create({
      data: {
        deskripsi: data.deskripsi,
        harga: data.harga,
        berat: data.berat,
        id_transaksi: 0,
      },
    })
  }

  updateOne = async (id: number, data: Opsi) => {
    return prisma.opsi.update({
      where: {
        id: id,
      },
      data: {
        deskripsi: data.deskripsi,
        harga: data.harga,
      },
    })
  }

  deleteOne = async (id: number) => {
    return prisma.opsi.delete({ where: { id } })
  }
}

export class OpsiPenukaran
  extends OpsiPenukaranMutation
  implements IPrismaOperator<Opsi>
{
  findAll = async () => {
    return prisma.opsi.findMany({})
  }

  findId = async (id: number) => {
    return prisma.opsi.findUnique({ where: { id } })
  }

  transaksiSampah = async () => {
    return prisma.opsi.findMany({
      select: {
        berat: true,
        harga: true,
        id: true,
        deskripsi: true,
        // Transaksi: {
        //   select: {
        //     Material: true,
        //   },
        // },
      },
    })
  }

  user_opsiPenukaran = async () => {
    return prisma.$transaction(async (tx) => {
      return {
        user: await tx.user.findMany({
          select: {
            id: true,
            nama: true,
          },
        }),
        opsiPenukaran: await tx.opsi.findMany({
          where: {
            typeOpsiId: "Penukaran",
          },
          select: {
            id: true,
            deskripsi: true,
          },
        }),
      }
    })
  }
}

export const opsiPenukaran = new OpsiPenukaran()
