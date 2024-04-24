import { prisma } from "../../config/prisma";

export class RiwayatPenukaranUser {
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

  riwayatPenukaran = async (id: number) => {
    return prisma.transaksi.findMany({
      where: { id: id },
      select: {
        id: true,
        tgl_transaksi: true,
        opsi_Penukaran: true,
        User: true,
      },
    });
  };
}

export const riwayatPenukaranUser = new RiwayatPenukaranUser();
