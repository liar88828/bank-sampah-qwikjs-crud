import { IPrismaOperator } from "~/type/IPrismaOperator";
import { prisma } from "../config/prisma";
import { TMaterial, TSearchData } from "~/type/material.type";
import { MaterialUser } from "./join";

class Material extends MaterialUser implements IPrismaOperator<TMaterial> {
  findAll = async () => {
    const materials = await prisma.material.findMany({});
    return materials;
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
                id_user: true,
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
