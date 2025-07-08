import express, { Request, Response } from "express";
import {
  createRestaurent,
  deleteRestaurent,
  getRestaurent,
  getRestaurents,
  updateRestaurent,
} from "../services/restaurentService";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      res.status(400).json({ message: "Name and address are required." });
      return;
    }
    const created = await createRestaurent(name, address);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, address } = req.body;
    if (isNaN(id) || (!name && !address)) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }
    const updated = await updateRestaurent(id, name, address);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    if (page < 1 || pageSize < 1) {
      res.status(400).json({ message: "Invalid pagination params." });
      return;
    }
    const data = await getRestaurents(page, pageSize);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }
    const data = await getRestaurent(id);
    if (!data) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }
    const deleted = await deleteRestaurent(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
