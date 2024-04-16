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

  //create transaction for buy material
  // will create riwayat_penukaran        :status is SIMPAN
  // will resolve by material owner       :status is PROCESS
  // will update material berat by owner  :status is SELESAI

  createRiwayat = async (
    id_user_penukar: number,
    id_material: number,
    jumlah: number,
  ) => {
    return prisma.$transaction(async (tx) => {
      const opsi_penukaran = await tx.opsi_Penukaran.create({
        data: {
          berat: jumlah,
          deskripsi: "opsi penukaran",
          // harga: 10000,
        },
      });

      const status = await tx.status_Penukaran.create({
        data: {
          type: "SIMPAN",
        },
      });

      const riwayat = await tx.riwayat_Penukaran.create({
        data: {
          tgl_tukar: new Date(),
          id_user_penukaran: id_user_penukar,
          id_opsi_penukaran: opsi_penukaran.id,
          id_status_penukaran: status.id,
          id_material: id_material,
        },
      });
      return riwayat;
    });
  };

  resolveRiwayat = async (
    id: number,
    id_user_owner: number,
    data_penukaran: {
      berat: number;
      deskripsi: string;
      harga: number;
    },
  ) => {
    return prisma.$transaction(async (tx) => {
      const riwayat = await tx.riwayat_Penukaran.update({
        where: {
          id: id,
          Material: {
            id_user: id_user_owner,
          },
        },
        data: {
          tgl_tukar: new Date(),
        },
      });

      if (!riwayatPenukaran) {
        return "riwayat not found";
      }

      const opsi_penukaran = await tx.opsi_Penukaran.update({
        where: { id: riwayat?.id_opsi_penukaran as number },
        data: {
          berat: data_penukaran.berat,
          deskripsi: data_penukaran.deskripsi,
          harga: data_penukaran.harga,
        },
      });

      const status = await tx.status_Penukaran.update({
        where: { id: riwayat?.id_status_penukaran as number },
        data: {
          type: "PROCESS",
        },
      });

      return riwayat;
    });
  };

  // will update material berat by owner  :status is SELESAI
  finishRiwayat = async (
    id: number,
    id_user_owner: number,
    data: {
      berat: number;
      deskripsi: string;
      harga: number;
    },
  ) => {
    return prisma.$transaction(async (tx) => {
      const riwayat = await tx.riwayat_Penukaran.update({
        where: {
          id: id,
          Material: {
            id_user: id_user_owner,
          },
        },
        data: {
          tgl_tukar: new Date(),
        },
      });

      const material = await tx.material.update({
        where: { id: riwayat?.id_material as number },
        data: {
          berat: {
            decrement: data.berat as number,
          },
        },
      });

      const opsi_penukaran = await tx.opsi_Penukaran.update({
        where: { id: riwayat?.id_opsi_penukaran as number },
        data: {
          berat: data.berat,
          deskripsi: data.deskripsi,
          harga: data.harga,
        },
      });

      const status = await tx.status_Penukaran.update({
        where: { id: riwayat?.id_status_penukaran as number },
        data: {
          type: "SELESAI",
        },
      });
    });
  };

  createPenukaran = async (id: number, jumlah: number) => {
    return prisma.$transaction(async (tx) => {
      const material = await tx.material.findUnique({ where: { id } });

      if (!material) {
        return {
          error: "Material not found",
        };
      }
      if (material.berat < jumlah) {
        return {
          error: "Material Berat is Valid",
        };
      }
      const transaksi = await tx.material.update({
        where: { id },
        data: {
          berat: {
            decrement: jumlah,
          },
        },
      });

      return {
        transaksi,
        material,
      };
    });
  };
}

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
