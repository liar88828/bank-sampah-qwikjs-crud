import { IPrismaOperator } from "~/type/IPrismaOperator";
import { prisma } from "./prisma";
import { TMaterial } from "~/type/TMaterial";

class Material implements IPrismaOperator<TMaterial> {
  findAll = async () => {
    const materials = await prisma.material.findMany();
    return materials;
  };

  findId = async (id: number) => {
    const material = await prisma.material.findUnique({ where: { id } });
    return material;
  };

  createOne = async ({ berat, nama }: TMaterial) => {
    const material = await prisma.material.create({
      data: {
        berat,
        nama,
      },
    });

    return material;
  };

  updateOne = async (id: number, { berat, nama }: TMaterial) => {
    const material = await prisma.material.update({
      where: {
        id: id,
      },
      data: { berat, nama },
    });
    return material;
  };

  deleteOne = async (id: number) => {
    const material = await prisma.material.delete({ where: { id } });
    return material;
  };
}

export const material = new Material();
