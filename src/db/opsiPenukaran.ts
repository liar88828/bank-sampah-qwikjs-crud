import { prisma } from "../config/prisma";
import { IPrismaOperator } from "~/type/IPrismaOperator";
import { TOpsi_Penukaran } from "~/type/opsiPenukaran.type";

export  class OpsiPenukaran implements IPrismaOperator<TOpsi_Penukaran> {
  findAll = async () => {
    return prisma.opsi_Penukaran.findMany({});
  };

  findId = async (id: number) => {
    return prisma.opsi_Penukaran.findUnique({ where: { id } });
  };
  createOne = async (data: TOpsi_Penukaran) => {
    return prisma.opsi_Penukaran.create({
      data: {
        deskripsi: data.deskripsi,
        harga: data.harga,
        berat: data.berat,
      },
    });
  };
  updateOne = async (id: number, data: TOpsi_Penukaran) => {
    return prisma.opsi_Penukaran.update({
      where: {
        id: id,
      },
      data: {
        deskripsi: data.deskripsi,
        harga: data.harga,
      },
    });
  };

  deleteOne = async (id: number) => {
    return prisma.opsi_Penukaran.delete({ where: { id } });
  };

  transaksiSampah = async (id: number) => {
    return prisma.opsi_Penukaran.findMany({
      select: {
        berat: true,
        harga: true,
        id: true,
        deskripsi: true,
        Transaksi: {
          select: {
            Material: true,
          },
        },
      },
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

export const opsiPenukaran = new OpsiPenukaran();
