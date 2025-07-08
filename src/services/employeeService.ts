import { PrismaClient, Employee } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmployees = async (
  restaurentId: number
): Promise<Employee[]> => {
  try {
    return await prisma.employee.findMany({
      where: {
        restaurentId,
      },
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Could not fetch employees.");
  }
};

export const getEmployee = async (id: number): Promise<Employee | null> => {
  try {
    return await prisma.employee.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw new Error("Could not fetch the employee.");
  }
};

export const createEmployee = async (
  name: string,
  lastName: string,
  restaurentId: number
): Promise<Employee> => {
  try {
    return await prisma.employee.create({
      data: {
        name,
        lastName,
        restaurentId,
      },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Could not create the employee.");
  }
};

export const updateEmployee = async (
  id: number,
  name?: string,
  lastName?: string,
  restaurentId?: number
): Promise<Employee> => {
  try {
    return await prisma.employee.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(lastName && { lastName }),
        ...(restaurentId && { restaurentId }),
      },
    });
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw new Error("Could not update the employee.");
  }
};

export const deleteEmployee = async (id: number): Promise<Employee> => {
  try {
    return await prisma.employee.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw new Error("Could not delete the employee.");
  }
};
