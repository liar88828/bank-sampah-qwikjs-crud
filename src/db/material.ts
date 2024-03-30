import {prisma} from "./prisma";
import {TMaterial} from "~/type/TMaterial";


export const findAllMaterial = async () => {
  const materials = await prisma.material.findMany();
  return materials
}

export const findIdMaterial = async (id: number) => {
  const material = await prisma.material.findUnique({ where: { id } });
  return material;
};
export const createMaterial = async (
  { berat, nama }: TMaterial,
) => {
  const material = await prisma.material.create({
	data: {
	  berat, nama,
	},
  });

  return material;
};
export const updateMaterial = async (
  id: number,
  { berat, nama }: TMaterial,
) => {
  const material = await prisma.material.update({
	where: {
	  id: id,
	},
	data: { berat, nama },
  });
  return material;
};

export const deleteMaterial = async (id: number) => {
  const material = await prisma.material.delete({ where: { id } });
  return material;
};
