import express, { Request, Response } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../services/employeeService";

const router = express.Router();

router.post("/employees", async (req: Request, res: Response) => {
  try {
    const { name, lastName, restaurentId } = req.body;

    if (!name || !lastName || !restaurentId) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const created = await createEmployee(name, lastName, restaurentId);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/employees", async (req: Request, res: Response) => {
  try {
    const restaurentId = Number(req.query.restaurentId);

    if (isNaN(restaurentId)) {
      res.status(400).json({ message: "Invalid or missing restaurentId." });
      return;
    }

    const employees = await getEmployees(restaurentId);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/employees/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }

    const employee = await getEmployee(id);

    if (!employee) {
      res.status(404).json({ message: "Employee not found." });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/employees/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, lastName, restaurentId } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }

    if (!name && !lastName && !restaurentId) {
      res
        .status(400)
        .json({ message: "At least one field is required to update." });
      return;
    }

    const updated = await updateEmployee(id, name, lastName, restaurentId);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/employees/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }

    const deleted = await deleteEmployee(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
