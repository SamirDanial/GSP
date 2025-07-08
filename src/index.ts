import express, { Request, Response } from "express";

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// restaurents related routes
import {
  createRestaurent,
  deleteRestaurent,
  getRestaurent,
  getRestaurents,
  updateRestaurent,
} from "./routes/restaurent";

// employees related routes
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "./routes/employee";

// owners related routes
import {
  createOwner,
  deleteOwner,
  getOwner,
  getOwners,
  updateOwner,
} from "./routes/owner";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Restaurent staff

app.post("/restaurents", async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      res.status(400).json({ message: "Name and address are required." });
      return;
    }

    const created = await createRestaurent(name, address);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update
app.put("/restaurents/:id", async (req: Request, res: Response) => {
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
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all with pagination
app.get("/restaurents", async (req: Request, res: Response) => {
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
    console.error("Error getting restaurants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get one
app.get("/restaurents/:id", async (req: Request, res: Response) => {
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
    console.error("Error getting restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete
app.delete("/restaurents/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID." });
      return;
    }

    const deleted = await deleteRestaurent(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
