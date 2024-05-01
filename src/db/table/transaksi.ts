import { prisma } from "~/config/prisma"
import type { Transaksi } from "@prisma/client"
import type { TTransaksi, PropsTransaksi } from "~/type/db/table.type"
import { type IPrismaOperator } from "~/type/global/IPrismaOperator"

abstract class TransaksiMutation {
  createOne = async (data: TTransaksi) =>
    prisma.transaksi.create({
      data: {
        tgl_transaksi: data.tgl_transaksi,
        userBuyId: data.id_user,
        // berat: data.berat,
        // harga: data.harga,
        // id_material: data.id_material,
      },
    })

  updateOne = async (id: number, data: TTransaksi) => {
    return prisma.transaksi.update({
      where: {
        id: id,
      },
      data: {
        tgl_transaksi: data.tgl_transaksi,
        userBuyId: data.id_user,
        // berat: data.berat,
        // harga: data.harga,
        // id_material: data.id_material,
      },
    })
  }

  deleteOne = async (id: number) => {
    return prisma.transaksi.delete({ where: { id } })
  }
}

export class TransaksiClass
  extends TransaksiMutation
  implements IPrismaOperator<TTransaksi>
{
  findAll = async (page = 0, limit = 1000) => {
    return prisma.transaksi.findMany({
      take: 100,
      skip: page * limit,
    })
  }

  findId = async (id: number) => {
    return prisma.transaksi.findUnique({ where: { id } })
  }

  find_Transaksi_Material = async (id: string): Promise<Transaksi[]> => {
    const res = await prisma.transaksi.findMany({
      where: { userBuyId: id },
      // include: {
      //   Material: true,
      //   User: true,
      // },
      select: {
        createdAt: true,
        id: true,
        // id_material: true,
        userBuyId: true,
        // userSellId: true,
        tgl_transaksi: true,
        updatedAt: true,
        id_status: true,
        // Material: true,
      },
    })
    return res
  }

  findDetail = async (id: number): Promise<PropsTransaksi> => {
    return prisma.transaksi.findUnique({
      where: {
        id,
        Opsi: {
          typeOpsiId: "Penukaran",
        },
      },
      include: {
        Opsi: true,
        // userSell: {
        //   select: {
        //     nama: true,
        //     alamat: true,
        //     no_hp: true,
        //   },
        // },
      },
    })
  }
}
