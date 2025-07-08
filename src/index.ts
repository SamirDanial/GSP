import express from "express";
import bodyParser from "body-parser";

import restaurentRoutes from "./routes/restaurentRoutes";
import ownerRoutes from "./routes/ownerRoutes";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount modular routes
app.use("/restaurents", restaurentRoutes);
app.use("/owners", ownerRoutes);
app.use("/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
