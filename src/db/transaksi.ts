import {prisma} from "./prisma";
import {TTransaksi} from "~/type/TTransaksi";

class Transaksi {
  
  
 
  findAll = async (page = 0, limit = 1000) => {
    return prisma.transaksi.findMany(
      {
        take: 100,
        skip: page * limit
      }
    );
  }
  
  
  findId = async (id: number) => {
    return prisma.transaksi.findUnique({where: {id}});
  };
  
  createOne = async (
    data: TTransaksi
  ) =>
    prisma.transaksi.create({
      data: {
        tgl_transaksi: data.tgl_transaksi,
        berat: data.berat,
        harga: data.harga,
        id_user: data.id_user,
        id_material: data.id_material,
      },
    });
  
  updateOne = async (
    id: number,
    data: TTransaksi
    ,
  ) => {
    return prisma.transaksi.update({
      where: {
        id: id,
      },
      data: {
        tgl_transaksi: data.tgl_transaksi,
        berat: data.berat,
        harga: data.harga,
        id_user: data.id_user,
        id_material: data.id_material,
      },
    });
  };
  
  
  deleteOne = async (id: number) => {
    return prisma.transaksi.delete({where: {id}});
  };
}

export const transaksi = new Transaksi()