import { User } from "~/type/user";
import { prisma } from "./prisma";


export const findAll=async()=>{
  const users = await prisma.user.findMany();
  return users
}

export const findUserId = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};
export const createUser = async (
  data: Pick<User, "email" | "alamat" | "no_hp" | "nama">,
) => {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      alamat: data.alamat,
      no_hp: data.no_hp,
      nama: data.nama,
    },
  });

  return user;
};
export const updateUser = async (
  id: number,
  data: Pick<User, "email" | "alamat" | "no_hp" | "nama">,
) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: data.email,
      alamat: data.alamat,
      no_hp: data.no_hp,
      nama: data.nama,
    },
  });
  return user;
};

export const deleteUser = async (id: number) => {
  const user = await prisma.user.delete({ where: { id } });
  return user;
};
