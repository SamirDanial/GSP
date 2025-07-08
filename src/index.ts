import express, { Request, Response } from "express";
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// restaurents related routes
import {
  createRestaurent,
  deleteRetaurent,
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

app.post("/createRestaurent", async (req: Request, res: any) => {
  const { name, address } = await req.body;

  const createdRestaurent = await createRestaurent(name, address);

  return res.json(createdRestaurent);
});

app.put("/updateRestaurent", async (req: Request, res: any) => {
  const { id } = req.query;

  const { name, address } = req.body;

  if (!id || !name || !address) return;

  const updatedRestaurent = await updateRestaurent(+id, name, address);

  return res.json(updatedRestaurent);
});

app.get("/getRestaurents", async (req: Request, res: any) => {
  const { page, pageSize } = req.query;

  if (!page || !pageSize) return;

  const restaurents = await getRestaurents(+page, +pageSize);

  return res.json(restaurents);
});

app.get("/getRestaurent", async (req: Request, res: any) => {
  console.log("Get Restaurent");
  const { id } = req.query;

  if (!id) return;

  const restaurent = await getRestaurent(+id);

  return res.json(restaurent);
});

app.delete("/deleteRestaurent", async (req: Request, res: any) => {
  const { id } = req.query;

  if (!id) return;

  const deletedRestaurent = await deleteRetaurent(+id);

  return res.json(deletedRestaurent);
});

//

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello from TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
