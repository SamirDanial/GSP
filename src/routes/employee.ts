import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmployees = async (restaurentId: number) => {
  const employees = prisma.employee.findMany({
    where: {
      restaurentId,
    },
  });

  return employees;
};

export const getEmployee = async (id: number) => {
  const employee = await prisma.employee.findFirst({
    where: {
      id,
    },
  });

  return employee;
};

export const createEmployee = async (
  name: string,
  lastName: string,
  restaurentId: number
) => {
  const createdEmployee = await prisma.employee.create({
    data: {
      name,
      lastName,
      restaurentId,
    },
  });

  return createdEmployee;
};

export const updateEmployee = async (
  id: number,
  name: string,
  lastName: string,
  restaurentId: number
) => {
  const updatedEmployee = await prisma.employee.update({
    where: {
      id,
    },
    data: {
      name,
      lastName,
      restaurentId,
    },
  });

  return updatedEmployee;
};

export const deleteEmployee = async (id: number) => {
  const deletedEmployee = await prisma.employee.delete({
    where: {
      id,
    },
  });

  return deletedEmployee;
};
