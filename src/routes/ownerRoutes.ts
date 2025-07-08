import express, { Request, Response } from "express";
import {
  createOwner,
  deleteOwner,
  getOwner,
  getOwners,
  updateOwner,
} from "../services/ownerService";

const router = express.Router();

router.post("/owners", async (req: Request, res: Response) => {
  try {
    const { name, lastName, restaurentId } = req.body;

    if (!name || !lastName || !restaurentId) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const created = await createOwner(name, lastName, restaurentId);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/owners", async (req: Request, res: Response) => {
  try {
    const restaurentId = Number(req.query.restaurentId);

    if (isNaN(restaurentId)) {
      res.status(400).json({ message: "Invalid or missing restaurentId." });
      return;
    }

    const owners = await getOwners(restaurentId);
    res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/owners/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }

    const owner = await getOwner(id);

    if (!owner) {
      res.status(404).json({ message: "Owner not found." });
      return;
    }

    res.status(200).json(owner);
  } catch (error) {
    console.error("Error fetching owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/owners/:id", async (req: Request, res: Response) => {
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

    const updated = await updateOwner(id, name, lastName, restaurentId);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/owners/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }

    const deleted = await deleteOwner(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
