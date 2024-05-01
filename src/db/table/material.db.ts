import { MaterialJoin } from "../join/material"
import { type IPrismaOperator } from "~/type/global/IPrismaOperator"
import { type TMaterial } from "~/type/db/table.type"
import { type PaginationType } from "~/type/controller/PaginationType"
import { type Material } from "@prisma/client"
import { prisma } from "~/config/prisma"

abstract class MaterialMutation extends MaterialJoin(Object) {
  createOne = async (data: Omit<TMaterial, "id">): Promise<Material> => {
    const material = await prisma.material.create({
      data: {
        id_user: data.id_user,
        nama: data.nama,
        berat: data.berat,
        kategori: data.kategori,
        harga: data.harga,
        satuan: data.satuan,
        deskripsi: data.deskripsi,
      },
    })

    return material
  }

  updateOne = async (id: number, data: Omit<TMaterial, "id">) => {
    const material = await prisma.material.update({
      where: {
        id: id,
      },
      data: {
        berat: data.berat,
        nama: data.nama,
        kategori: data.kategori,
      },
    })
    return material
  }

  deleteOne = async (id: number) => {
    const material = await prisma.material.delete({ where: { id } })
    return material
  }
}

export class MaterialDB
  extends MaterialMutation
  implements IPrismaOperator<Material>
{
  findAll = async () => {
    const materials = await prisma.material.findMany()
    return materials
  }

  findAllUser = async ({
    id,
    page = 0,
    search = "",
  }: PaginationType<string>) => {
    const limit = 100

    return prisma.transaksi.findMany({
      where: {
        userBuyId: id,
        id_status: search,
      },
      select: {
        id: true,
        tgl_transaksi: true,
        // userSellId: true,
      },

      take: 100,
      skip: page * limit,
    })
  }

  async findId(id: number): Promise<Material> {
    return prisma.material.findUniqueOrThrow({ where: { id: id } })
  }
}
