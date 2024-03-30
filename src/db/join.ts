import {prisma} from "~/db/prisma";


class Join {
  
  user_material = async () => {
    return prisma.$transaction(async (tx) => {
      
      const materials = await tx.material.findMany({
        select: {
          id: true,
          nama: true
        }
      });
      const user = await tx.user.findMany({
        select: {
          id: true,
          nama: true
        }
      });
      
      
      return {user, materials}
    })
  }
}


export const join = new Join()