import { prisma } from "~/config/prisma";

export const userSearch = async (search: string, page: number) => {
  return prisma.user.findMany({
    where: {
      nama: { contains: search },
    },
    take: 100,
    skip: 100 * Number(page),
  });
};

export const materialGroup = async () => {
  return prisma.material.groupBy({
    by: "kategori",
    _sum: {
      berat: true,
    },
    _count: {
      kategori: true,
    },
  });
};

export const findMaterial_User = async (id: number, jumlah: number) =>
  prisma.$transaction(async (tx) => {
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
