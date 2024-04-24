import { prisma } from "../config/prisma";
import { RiwayatPenukaranUser } from "./join/RiwayatPenukaranUser";
import { Transaksi } from "@prisma/client";

class RiwayatPenukaran extends RiwayatPenukaranUser {
  // implements IPrismaOperator<LoaderRiwayat_Penukaran>
  findAll = async () => {
    return prisma.transaksi.findMany({
      include: {
        User: {
          select: {
            id: true,
            nama: true,
          },
        },
        opsi_Penukaran: {
          select: {
            id: true,
            deskripsi: true,
          },
        },
      },
    });
  };

  findId = async (id: number) => {
    return prisma.transaksi.findUnique({
      where: { id },

      include: {
        User: {
          select: {
            id: true,
            nama: true,
          },
        },
        opsi_Penukaran: {
          select: {
            id: true,
            deskripsi: true,
          },
        },
      },
    });
  };

  createOne = async (
    data: Pick<Transaksi, "id_material" | "id_user" | "tgl_transaksi">,
  ) => {
    return prisma.transaksi.create({
      data: {
        tgl_transaksi: data.tgl_transaksi,
        id_material: data.id_material,
        id_user: data.id_user,
      },
    });
  };

  updateOne = async (id: number, data: Transaksi) => {
    return prisma.transaksi.update({
      where: {
        id: id,
      },
      data: {
        tgl_transaksi: data.tgl_transaksi,
        id_material: data.id_material,
        id_user: data.id_user,
      },
    });
  };

  deleteOne = async (id: number) => {
    return prisma.transaksi.delete({ where: { id } });
  };
}

export const riwayatPenukaran = new RiwayatPenukaran();
