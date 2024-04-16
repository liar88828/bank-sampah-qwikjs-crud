import { Prisma } from "@prisma/client";
import { prisma } from "~/config/prisma";
import { TSearchData } from "~/type/material.type";

class Join {
  user_material = async () => {
    return prisma.$transaction(async (tx) => {
      const materials = await tx.material.findMany({
        select: {
          id: true,
          nama: true,
        },
      });
      const user = await tx.user.findMany({
        select: {
          id: true,
          nama: true,
        },
      });

      return { user, materials };
    });
  };

  user_opsiPenukaran = async () => {
    return prisma.$transaction(async (tx) => {
      return {
        user: await tx.user.findMany({
          select: {
            id: true,
            nama: true,
          },
        }),
        opsiPenukaran: await tx.opsi_Penukaran.findMany({
          select: {
            id: true,
            deskripsi: true,
          },
        }),
      };
    });
  };
}

export const join = new Join();

export class TransaksiUser {
  findAllUser = async (id: number, page = 0, search = "") => {
    let limit = 100;
    return prisma.transaksi.findMany({
      where: {
        id_user: id,
      },
      take: 100,
      skip: page * limit,
    });
  };
}
export class MaterialUser {
  findAllUser = async (id: number, page = 0, search = "") => {
    let limit = 100;
    return prisma.material.findMany({
      where: {
        nama: { contains: search },
        Sampah_Transaksi: {
          Transaksi: {
            id_user: id,
          },
        },
      },
      take: 100,
      skip: page * limit,
    });
  };

  findSearchPageUser = async (
    id: number,
    jenis: string,
    search: string,
    page: number
  ) => {
    // console.table({ id, jenis, search, page });
    return prisma.material.findMany({
      where: {
        Sampah_Transaksi: {
          Transaksi: {
            id_user: id,
          },
        },
        jenis: { contains: jenis },
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * page,
    });
  };

  findMaterialUser = async (id: number) => {
    return prisma.material.groupBy({
      where: {
        Sampah_Transaksi: {
          Transaksi: {
            id_user: id,
          },
        },
      },
      by: "jenis",
      _sum: {
        berat: true,
      },
      _count: {
        jenis: true,
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
      where.jenis = searchData.jenis;
      // where.jenis = { contains: searchData.jenis };
    }
    // console.log(where);
    const res = await prisma.material.findMany({ where });
    return res;
  };

  findSearchPage = async (jenis: string, search: string, page: number) => {
    return prisma.material.findMany({
      where: {
        jenis: { contains: jenis },
        nama: { contains: search },
      },
      take: 100,
      skip: 100 * page,
    });
  };
}

