import { prisma } from "~/config/prisma"
import { MaterialJoin } from "../join/material"
import { type TSearchData } from "~/type/db/menu.type"
import { type Material } from "@prisma/client"
import type { PaginationType } from "~/type/controller/PaginationType"
export type MaterialSearchOther = {
  id_user: string
  jenis: string
}

abstract class MaterialMenuMutation extends MaterialJoin(Object) {
  findMaterialUpdate = async (id: number, jumlah: number) => {
    return prisma.$transaction(async (tx) => {
      const material = await tx.material.findUnique({ where: { id } })

      if (!material) {
        return {
          error: "Material not found",
        }
      }
      if (material.berat < jumlah) {
        return {
          error: "Material Berat is Valid",
        }
      }
      const transaksi = await tx.material.update({
        where: { id },
        data: {
          berat: {
            decrement: jumlah,
          },
        },
      })
      return {
        transaksi,
        material,
      }
    })
  }
}

export abstract class MaterialMenu extends MaterialMenuMutation {
  findMaterialUser = async (id_user: string) => {
    return prisma.material.groupBy({
      where: {
        id_user,
      },
      by: "kategori",
      _sum: {
        berat: true,
      },
      _count: {
        kategori: true,
      },
    })
  }
  findSearchPage = async ({
    search,
    page,
    other: jenis,
  }: PaginationType<string, any>): Promise<Material[]> => {
    return prisma.material.findMany({
      where: {
        kategori: { contains: jenis },
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * page,
    })
  }

  findAllSearch = async (searchData: TSearchData) => {
    const where = {} as Material

    if (searchData.nama) {
      where.nama = searchData.nama
      // where.nama = { contains: searchData.nama };
    }

    if (searchData.jenis) {
      where.kategori = searchData.jenis
      // where.jenis = { contains: searchData.jenis };
    }
    // console.log(where);
    const res = await prisma.material.findMany({ where })
    return res
  }

  findMaterial = async () => {
    return prisma.material.groupBy({
      by: ["kategori"],
      _sum: {
        berat: true,
      },
    })
  }

  findGroup = async (search: TSearchData) => {
    return {
      group: await this.findMaterial(),
      load: await this.findAllSearch(search),
    }
  }

  async findSearchPageUser({
    search,
    page,
    other: { id_user, jenis },
  }: PaginationType<string, MaterialSearchOther>) {
    // console.table({ id, jenis, search, page });

    return prisma.material.findMany({
      where: {
        id_user: id_user,
        kategori: { contains: jenis },
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * page,
    })
  }
}
