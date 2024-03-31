import {prisma} from "./prisma";
import {IPrismaOperator} from "~/type/IPrismaOperator";
import {TOpsi_Penukaran} from "~/type/TOpsi_Penukaran";

class OpsiPenukaran implements IPrismaOperator<TOpsi_Penukaran> {
  
  findAll = async () => {
    return prisma.opsi_Penukaran.findMany({})
  }
  
  findId = async (id: number) => {
    return prisma.opsi_Penukaran.findUnique({where: {id}});
    
  };
  createOne = async (
    data: TOpsi_Penukaran,
  ) => {
    return prisma.opsi_Penukaran.create({
      data: {
        deskripsi: data.deskripsi,
        harga: data.harga
      },
    });
    
    
  };
  updateOne = async (
    id: number,
    data: TOpsi_Penukaran,
  ) => {
    return prisma.opsi_Penukaran.update({
      where: {
        id: id,
      },
      data: {
        deskripsi: data.deskripsi,
        harga: data.harga
      },
    });
  };
  
  deleteOne = async (id: number) => {
    return prisma.opsi_Penukaran.delete({where: {id}});
    
  };
}

export const opsiPenukaran = new OpsiPenukaran()