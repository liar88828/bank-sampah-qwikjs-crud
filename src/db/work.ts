import { prisma } from "./prisma";
import { TPenyerahanSampah } from "~/type/TPenyerahanSampah";

class Work {
  // single transaction
  transaction_penyerahanSampah = async (data: TPenyerahanSampah) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(data.id_user) },
    });

    if (!user) {
      throw "User Not Found";
    }

    return prisma.transaksi.create({
      data: {
        tgl_transaksi: new Date(),
        id_user: user.id,
        // status transaksi-one
        Status_Transaksi: {
          create: {
            type: data.status,
          },
        },
        // sampah transaksi-one
        Sampah_Transaksi: {
          create: {
            total_berat: 0,
            total_harga: 0,
            // material -many
            Material: {
              createMany: {
                data: data.sampah.map((d) => {
                  return {
                    berat: Number(d.berat),
                    jenis: d.jenis,
                    nama: d.nama,
                    id_sampahTransaksi: user.id,
                  };
                }),
              },
            },
          },
        },
      },
    });
  };

  // multi
  penyerahanSampah = async (data: TPenyerahanSampah) => {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: Number(data.id_user) },
      });

      if (!user) {
        return {
          success: false,
          error: "User Not Found",
        };
      }

      const transaksi = await tx.transaksi.create({
        data: {
          tgl_transaksi: new Date(),
          id_user: user.id,
        },
      });

      const status_Transaksi = await tx.status_Transaksi.create({
        data: {
          type: data.status,
          id_transaksi: transaksi.id,
        },
      });

      const sampah_Transaksi = await tx.sampah_Transaksi.create({
        data: {
          total_berat: 0,
          total_harga: 0,
          id_Transaksi: user.id,
        },
      });

      const material = await tx.material.createMany({
        data: data.sampah.map((d) => {
          return {
            berat: Number(d.berat),
            jenis: d.jenis,
            nama: d.nama,
            id_sampahTransaksi: user.id,
          };
        }),
      });

      // const transaksi = await tx.transaksi.create({
      //   data: {
      //     tgl_transaksi: new Date(),
      //     id_user: user.id,

      //     // sampah transaksi-one
      //     Sampah_Transaksi: {
      //       create: {
      //         total_berat: 0,
      //         total_harga: 0,
      //         // material -many
      //         Material: {
      //           createMany: {
      //             data: data.sampah.map((d) => {
      //               return {
      //                 berat: Number(d.berat),
      //                 jenis: d.jenis,
      //                 nama: d.nama,
      //                 id_sampahTransaksi: user.id,
      //               };
      //             }),
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      // const sampahTransaksi = await tx.sampah_Transaksi.create({
      //   data: {
      //     total_berat: 0,
      //     total_harga: 0,
      //     Material: {
      //       createMany: {
      //         data: data.sampah.map((d) => {
      //           return {
      //             berat: Number(d.berat),
      //             jenis: d.jenis,
      //             nama: d.nama,
      //           }
      //         })
      //       }
      //     }
      //   }
      // })

      return {
        user,
        transaksi,
        status_Transaksi,
        sampah_Transaksi,
        material,
      };
    });
  };

  findAll = async (id: number) => {
    return prisma.user.findFirst();
  };

  transaksi = async (id_user: number) => {
    return prisma.transaksi.findMany({
      where: { id_user },
      select: {
        id: true,
        id_user: true,
        tgl_transaksi: true,

        Status_Transaksi: true,
        Sampah_Transaksi: {
          select: {
            id: true,
            total_berat: true,
            total_harga: true,

            Material: true,
            // _count: true,
          },
        },
      },
    });
  };

  transaksiSampah = async (id: number) => {
    return prisma.sampah_Transaksi.findMany({
      select: {
        total_berat: true,
        total_harga: true,
        id: true,
        id_Transaksi: true,
        Material: true,
      },
    });
  };

  riwayatPenukaran = async (id: number) => {
    return prisma.riwayat_Penukaran.findMany({
      where: { id: id },
      select: {
        id: true,
        id_opsi_penukaran: true,
        id_user_penukaran: true,
        Opsi_Penukaran: true,
        tgl_tukar: true,
        User: true,
      },
    });
  };
}

export const works = new Work();
