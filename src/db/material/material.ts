import { IPrismaOperator } from "~/type/IPrismaOperator";
import { prisma } from "../../config/prisma";
import { TMaterial, TSearchData } from "~/type/material.type";
import { MaterialUser } from "../join/MaterialUser";

class Material extends MaterialUser implements IPrismaOperator<TMaterial> {
  findAll = async () => {
    const materials = await prisma.material.findMany({});
    return materials;
  };

  findMaterial = async () => {
    return prisma.material.groupBy({
      by: ["kategori"],
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
        kategori: true,
        nama: true,
        id: true,
        id_user: true,
        createdAt: true,
        User: true,
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
    });
  };

  createOne = async (data: TMaterial) => {
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
        kategori: data.kategori,
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
