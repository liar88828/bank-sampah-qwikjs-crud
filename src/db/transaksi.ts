import {prisma} from "./prisma";
import {TTransaksi} from "~/type/TTransaksi";

export class Transaksi {
  
  findAll = async (page = 0, limit = 100) => {
    
    let take = limit
    let skip = limit * page//100*2=200
    return await prisma.transaksi.findMany({
      skip,
      take
    })
  }
  
  findId = async (id: number) => {
    return await prisma.transaksi.findUnique({where: {id}});
  };
  
  createOne = async (
    data: TTransaksi,
  ) => {
    return await prisma.transaksi.create({
      data: {
        tgl_transaksi: data.tgl_transaksi,
        berat: data.berat,
        harga: data.harga,
        id_user: data.id_user,
        id_material: data.id_material,
      },
    });
  };
  updateOne = async (
    id: number,
    data: TTransaksi,
  ) => {
    return await prisma.transaksi.update({
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
    return await prisma.transaksi.delete({where: {id}});
  };
}

export const transaksi = new Transaksi();