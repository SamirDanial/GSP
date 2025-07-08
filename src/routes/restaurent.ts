import { PrismaClient, Restaurent } from "@prisma/client";

const prisma = new PrismaClient();

export const getRestaurents = async (
  page: number = 1,
  pageSize: number = 10
): Promise<Restaurent[]> => {
  const skip = (page - 1) * pageSize;

  try {
    const restaurents = await prisma.restaurent.findMany({
      skip,
      take: pageSize,
    });
    return restaurents;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error("Could not fetch restaurants.");
  }
};

export const getRestaurent = async (id: number): Promise<Restaurent | null> => {
  try {
    return await prisma.restaurent.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching restaurant with id ${id}:`, error);
    throw new Error("Could not fetch the restaurant.");
  }
};

export const createRestaurent = async (
  name: string,
  address: string
): Promise<Restaurent> => {
  try {
    return await prisma.restaurent.create({
      data: {
        name,
        address,
      },
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw new Error("Could not create the restaurant.");
  }
};

export const updateRestaurent = async (
  id: number,
  name?: string,
  address?: string
): Promise<Restaurent> => {
  try {
    const updatedRestaurent = await prisma.restaurent.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(address && { address }),
      },
    });
    return updatedRestaurent;
  } catch (error) {
    console.error(`Error updating restaurant with id ${id}:`, error);
    throw new Error("Could not update the restaurant.");
  }
};

export const deleteRestaurent = async (id: number): Promise<Restaurent> => {
  try {
    return await prisma.restaurent.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting restaurant with id ${id}:`, error);
    throw new Error("Could not delete the restaurant.");
  }
};
