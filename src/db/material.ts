import { IPrismaOperator } from "~/type/IPrismaOperator";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import { TMaterial, TSearchData } from "~/type/material.type";

class Material implements IPrismaOperator<TMaterial> {
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

  findSearchPageUser = async (
    id: number,
    jenis: string,
    search: string,
    page: number,
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

  findAll = async () => {
    const materials = await prisma.material.findMany({});
    return materials;
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

    // let search: { OR?: { jenis?: string; nama?: string }[] } = {};

    // if (searchData.nama) {
    //   search.OR = search.OR || [];
    //   search.OR.push({ nama: { contains: searchData.nama } });
    // }

    // if (searchData.jenis) {
    //   search.OR = search.OR || [];
    //   search.OR.push({ jenis: { contains: searchData.jenis } });
    // }
    // const res = await prisma.material.findMany({
    //   where: search,
    // });
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
  findMaterial = async () => {
    return prisma.material.groupBy({
      by: ["jenis"],
      _sum: {
        berat: true,
      },
    });
  };
  findGroup = async (search: TSearchData) => {
    return {
      group: await this.findMaterial(),
      load: await this.findAllSearch(search),
    };

    // console.log(search);
    // const res = await prisma.material.groupBy({
    //   by: "jenis",
    //   _sum: {
    //     berat: true,
    //     id: true,
    //     id_sampahTransaksi: true,
    //   },
    // });
  };

  findId = async (id: number) => {
    const material = await prisma.material.findUnique({ where: { id } });
    return material;
  };

  findId_Relations = async (id: number) => {
    return prisma.material.findUnique({
      where: { id },
      select: {
        berat: true,
        jenis: true,
        nama: true,
        id: true,
        Sampah_Transaksi: {
          select: {
            Transaksi: {
              select: {
                id: true,
                tgl_transaksi: true,
                id_user:true,
                User: {
                  select: {
                    nama: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  };

  createOne = async (data: TMaterial) => {
    const material = await prisma.material.create({
      data: {
        berat: data.berat,
        nama: data.nama,
        jenis: data.jenis,
        id_sampahTransaksi: data.id_sampahTransaksi,
      },
    });

    return material;
  };

  updateOne = async (id: number, data: TMaterial) => {
    const material = await prisma.material.update({
      where: {
        id: id,
      },
      data: {
        berat: data.berat,
        nama: data.nama,
        jenis: data.jenis,
        id_sampahTransaksi: data.id_sampahTransaksi,
      },
    });
    return material;
  };

  deleteOne = async (id: number) => {
    const material = await prisma.material.delete({ where: { id } });
    return material;
  };
}

export const material = new Material();
