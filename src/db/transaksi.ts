import { IPrismaOperator } from "~/type/IPrismaOperator";
import { prisma } from "../config/prisma";
import { TransaksiUser } from "./join/TransaksiUser";
import { Material, Transaksi as TransaksiType } from "@prisma/client";
import { TTransaksi } from "~/type/transaksi.type";

export type TransaksiMaterial = TransaksiType & {
  Material: Material | null;
};
class Transaksi extends TransaksiUser implements IPrismaOperator<TTransaksi> {
  findAll = async (page = 0, limit = 1000) => {
    return prisma.transaksi.findMany({
      take: 100,
      skip: page * limit,
    });
  };

  findId = async (id: number) => {
    return prisma.transaksi.findUnique({ where: { id } });
  };

  find_Transaksi_Material = async (
    id: number,
  ): Promise<TransaksiMaterial[]> => {
    const res = await prisma.transaksi.findMany({
      where: { id_user: id },
      // include: {
      //   Material: true,
      //   User: true,
      // },
      select: {
        createdAt: true,
        id: true,
        id_material: true,
        id_user: true,
        tgl_transaksi: true,
        updatedAt: true,
        Material: true,
      },
    });
    return res;
  };

  findDetail = async (id: number) => {
    return prisma.transaksi.findUnique({
      where: { id },
      select: {
        id: true,
        id_user: true,
        tgl_transaksi: true,
        opsi_Penukaran: {
          select: {
            berat: true,
            harga: true,
            id: true,
            deskripsi: true,
          },
        },
        User: {
          select: {
            nama: true,
            alamat: true,
            no_hp: true,
          },
        },
      },
    });
  };

  createOne = async (data: TTransaksi) =>
    prisma.transaksi.create({
      data: {
        tgl_transaksi: data.tgl_transaksi,
        id_user: data.id_user,
        // berat: data.berat,
        // harga: data.harga,
        // id_material: data.id_material,
      },
    });

  updateOne = async (id: number, data: TTransaksi) => {
    return prisma.transaksi.update({
      where: {
        id: id,
      },
      data: {
        tgl_transaksi: data.tgl_transaksi,
        id_user: data.id_user,
        // berat: data.berat,
        // harga: data.harga,
        // id_material: data.id_material,
      },
    });
  };

  deleteOne = async (id: number) => {
    return prisma.transaksi.delete({ where: { id } });
  };
}

export const transaksi = new Transaksi();
