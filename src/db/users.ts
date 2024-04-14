import { prisma } from "../config/prisma";
import { IPrismaOperator } from "~/type/IPrismaOperator";
import { Prisma } from "@prisma/client";
import { UserProfile } from "~/type/user";

class User implements IPrismaOperator<UserProfile> {
  findFirst = async () => {
    const users = await prisma.user.findFirst();
    return users;
  };

  findAll = async () => {
    const users = await prisma.user.findMany();
    return users;
  };

  findSearchPage = async (nama: string, page: number, limit: number) => {
    const where = {} as Prisma.UserWhereInput;

    if (nama) {
      where.nama = { contains: nama };
    }
    const users = await prisma.user.findMany({
      where,
      take: limit,
      skip: page,
    });
    return users;
  };

  findId = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };

  createOne = async (
    data: Pick<UserProfile, "email" | "alamat" | "no_hp" | "nama">,
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
    data: Pick<UserProfile, "email" | "alamat" | "no_hp" | "nama">,
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
