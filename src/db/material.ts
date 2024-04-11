import { IPrismaOperator } from "~/type/IPrismaOperator";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import { TMaterial } from "~/type/material.type";
export type TSearchData = { nama: string; jenis: string };
class Material implements IPrismaOperator<TMaterial> {
  findAll = async () => {
    const materials = await prisma.material.findMany({});
    return materials;
  };

  findAllSearch = async (searchData: TSearchData) => {
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
  findGroup = async (search: TSearchData) => {
    // console.log(search);
    // const res = await prisma.material.groupBy({
    //   by: "jenis",
    //   _sum: {
    //     berat: true,
    //     id: true,
    //     id_sampahTransaksi: true,
    //   },
    // });
    const res = await prisma.material.groupBy({
      by: ["jenis"],
      _sum: {
        berat: true,
      },
    });

    return {
      group: res,
      load: await this.findAllSearch(search),
    };
  };

  findId = async (id: number) => {
    const material = await prisma.material.findUnique({ where: { id } });
    return material;
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
