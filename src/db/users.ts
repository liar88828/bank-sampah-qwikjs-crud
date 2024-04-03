import { TUser } from "~/type/user";
import { prisma } from "./prisma";
import { IPrismaOperator } from "~/type/IPrismaOperator";

class User implements IPrismaOperator<TUser> {
  findAll = async () => {
    const users = await prisma.user.findMany();
    return users;
  };

  findId = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };

  createOne = async (
    data: Pick<TUser, "email" | "alamat" | "no_hp" | "nama">,
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
  updateOne = async (
    id: number,
    data: Pick<TUser, "email" | "alamat" | "no_hp" | "nama">,
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

  deleteOne = async (id: number) => {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  };
}

export const user = new User();
