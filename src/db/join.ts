import { prisma } from "~/config/prisma";

class Join {
  user_material = async () => {
    return prisma.$transaction(async (tx) => {
      const materials = await tx.material.findMany({
        select: {
          id: true,
          nama: true,
        },
      });
      const user = await tx.user.findMany({
        select: {
          id: true,
          nama: true,
        },
      });

      return { user, materials };
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

export const join = new Join();
