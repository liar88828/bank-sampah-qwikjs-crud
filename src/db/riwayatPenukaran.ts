import { LoaderRiwayat_Penukaran } from "~/type/riwayatPenukaran.type";
import { prisma } from "../config/prisma";
import { IPrismaOperator } from "~/type/IPrismaOperator";

class RiwayatPenukaranUser {
  findAllUser = async (id: number, page = 0, search = "") => {
    let limit = 100;
    return prisma.riwayat_Penukaran.findMany({
      where: {
        id_user_penukaran: id,
      },
      take: 100,
      skip: page * limit,
    });
  };
}

export const riwayatPenukaranUser = new RiwayatPenukaranUser();
class RiwayatPenukaran
  extends RiwayatPenukaranUser
  implements IPrismaOperator<LoaderRiwayat_Penukaran>
{
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

  createOne = async (data: LoaderRiwayat_Penukaran) => {
    return prisma.riwayat_Penukaran.create({
      data: {
        tgl_tukar: data.tgl_tukar,
        id_user_penukaran: data.id_user_penukaran,
        id_opsi_penukaran: data.id_opsi_penukaran,
      },
    });
  };

  updateOne = async (id: number, data: LoaderRiwayat_Penukaran) => {
    return prisma.riwayat_Penukaran.update({
      where: {
        id: id,
      },
      data: {
        tgl_tukar: data.tgl_tukar,
        id_user_penukaran: data.id_user_penukaran,
        id_opsi_penukaran: data.id_opsi_penukaran,
      },
    });
  };

  deleteOne = async (id: number) => {
    return prisma.riwayat_Penukaran.delete({ where: { id } });
  };
}

export const riwayatPenukaran = new RiwayatPenukaran();
