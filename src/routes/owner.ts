import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOwners = async (restaurentId: number) => {
  const owners = prisma.owner.findMany({
    where: {
      restaurentId,
    },
  });

  return owners;
};

export const getOwner = async (id: number) => {
  const owner = await prisma.owner.findFirst({
    where: {
      id,
    },
  });

  return owner;
};

export const createOwner = async (
  name: string,
  lastName: string,
  restaurentId: number
) => {
  const createdOwner = await prisma.owner.create({
    data: {
      name,
      lastName,
      restaurentId,
    },
  });

  return createdOwner;
};

export const updateOwner = async (
  id: number,
  name: string,
  lastName: string,
  restaurentId: number
) => {
  const updatedOwner = await prisma.owner.update({
    where: {
      id,
    },
    data: {
      name,
      lastName,
      restaurentId,
    },
  });

  return updatedOwner;
};

export const deleteOwner = async (id: number) => {
  const deletedOwner = await prisma.owner.delete({
    where: {
      id,
    },
  });

  return deletedOwner;
};
