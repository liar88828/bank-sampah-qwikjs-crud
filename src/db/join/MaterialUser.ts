import { Prisma } from "@prisma/client";
import { prisma } from "~/config/prisma";
import { TSearchData } from "~/type/material.type";

export class MaterialUser {
  findAllUser = async (id: number, page = 0, search = "") => {
    let limit = 100;

    return prisma.transaksi.findMany({
      where: {
        id_user: id,
      },
      select: {
        id: true,
        id_user: true,
        Material: {
          select: {
            nama: true,
            id: true,
          },
        },
        tgl_transaksi: true,
      },

      take: 100,
      skip: page * limit,
    });

    // return prisma.material.findMany({
    //   where: {
    //     nama: { contains: search },
    //     id_user: id,
    //   },
    //   select: {
    //     id: true,
    //     berat: true,
    //     nama: true,
    //     jenis: true,
    //     id_user: true,
    //     Transaksi: true,

    //   },
    //   take: 100,
    //   skip: page * limit,
    // });
  };

  findSearchPageUser = async (
    id: number,
    jenis: string,
    search: string,
    page: number,
  ) => {
    // console.table({ id, jenis, search, page });
    return prisma.material.findMany({
      where: {
        id_user: id,
        kategori: { contains: jenis },
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * page,
    });
  };

  findMaterialUser = async (id: number) => {
    return prisma.material.groupBy({
      where: {
        id_user: id,
      },
      by: "kategori",
      _sum: {
        berat: true,
      },
      _count: {
        kategori: true,
      },
    });
  };

  findAllSearch = async (searchData: TSearchData) => {
    const where = {} as Prisma.MaterialWhereInput;

    if (searchData.nama) {
      where.nama = searchData.nama;
      // where.nama = { contains: searchData.nama };
    }

    if (searchData.jenis) {
      where.kategori = searchData.jenis;
      // where.jenis = { contains: searchData.jenis };
    }
    // console.log(where);
    const res = await prisma.material.findMany({ where });
    return res;
  };

  findSearchPage = async (jenis: string, search: string, page: number) => {
    return prisma.material.findMany({
      where: {
        kategori: { contains: jenis },
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * page,
    });
  };
}
