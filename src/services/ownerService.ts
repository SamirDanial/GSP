import { PrismaClient, Owner } from "@prisma/client";

const prisma = new PrismaClient();

export const getOwners = async (restaurentId: number): Promise<Owner[]> => {
  try {
    return await prisma.owner.findMany({
      where: {
        restaurentId,
      },
    });
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw new Error("Could not fetch owners.");
  }
};

export const getOwner = async (id: number): Promise<Owner | null> => {
  try {
    return await prisma.owner.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching owner with id ${id}:`, error);
    throw new Error("Could not fetch the owner.");
  }
};

export const createOwner = async (
  name: string,
  lastName: string,
  restaurentId: number
): Promise<Owner> => {
  try {
    return await prisma.owner.create({
      data: {
        name,
        lastName,
        restaurentId,
      },
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    throw new Error("Could not create the owner.");
  }
};

export const updateOwner = async (
  id: number,
  name?: string,
  lastName?: string,
  restaurentId?: number
): Promise<Owner> => {
  try {
    const updatedOwner = await prisma.owner.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(lastName && { lastName }),
        ...(restaurentId && { restaurentId }),
      },
    });
    return updatedOwner;
  } catch (error) {
    console.error(`Error updating owner with id ${id}:`, error);
    throw new Error("Could not update the owner.");
  }
};

export const deleteOwner = async (id: number): Promise<Owner> => {
  try {
    return await prisma.owner.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting owner with id ${id}:`, error);
    throw new Error("Could not delete the owner.");
  }
};
