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
    by: "jenis",
    _sum: {
      berat: true,
    },
    _count: {
      jenis: true,
    },
  });
};
