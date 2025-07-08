import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRestaurents = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const restaurents = await prisma.restaurent.findMany({
    skip: skip,
    take: pageSize,
  });

  return restaurents;
};

export const getRestaurent = async (id: number) => {
  const restaurent = await prisma.restaurent.findFirst({
    where: {
      id,
    },
  });

  return restaurent;
};

export const createRestaurent = async (name: string, address: string) => {
  const restaurent = await prisma.restaurent.create({
    data: {
      name,
      address,
    },
  });

  return restaurent;
};

export const updateRestaurent = async (id: number, name: any, address: any) => {
  const updatedRestaurent = await prisma.restaurent.update({
    where: {
      id,
    },
    data: {
      name,
      address,
    },
  });
  return updatedRestaurent;
};

export const deleteRetaurent = async (id: number) => {
  const deletedRestaurent = await prisma.restaurent.delete({
    where: {
      id,
    },
  });

  return deletedRestaurent;
};
