import { prisma } from "./prisma";
import { IPrismaOperator } from "~/type/IPrismaOperator";
import { TRiwayat_Penukaran } from "~/type/TRiwayat_Penukaran";

class RiwayatPenukaran implements IPrismaOperator<TRiwayat_Penukaran> {
  findAll = async () => {
    return prisma.riwayat_Penukaran.findMany({
      include: {
        User: {
          select: {
            id: true,
            nama: true,
          },
        },
        Opsi_Penukaran: {
          select: {
            id: true,
            deskripsi: true,
          },
        },
      },
    });
  };

  findId = async (id: number) => {
    return prisma.riwayat_Penukaran.findUnique({
      where: { id },

      include: {
        User: {
          select: {
            id: true,
            nama: true,
          },
        },
        Opsi_Penukaran: {
          select: {
            id: true,
            deskripsi: true,
          },
        },
      },
    });
  };
  createOne = async (data: TRiwayat_Penukaran) => {
    return prisma.riwayat_Penukaran.create({
      data: {
        tgl_tukar: data.tgl_tukar,
        id_user: data.id_user,
        id_opsi_penukaran: data.id_opsi_penukaran,
      },
    });
  };
  updateOne = async (id: number, data: TRiwayat_Penukaran) => {
    return prisma.riwayat_Penukaran.update({
      where: {
        id: id,
      },
      data: {
        tgl_tukar: data.tgl_tukar,
        id_user: data.id_user,
        id_opsi_penukaran: data.id_opsi_penukaran,
      },
    });
  };

  deleteOne = async (id: number) => {
    return prisma.riwayat_Penukaran.delete({ where: { id } });
  };
}

export const riwayatPenukaran = new RiwayatPenukaran();
