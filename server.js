const express = require("express");
require("dotenv").config();

const gatewayRoutes = require("./routes/gateway");
const dummyBackend = require("./backend/dummyBackend");

const app = express();
app.use(express.json());

// Attach the gateway route
app.use("/gateway", gatewayRoutes);

// Dummy backend
app.use("/backend", dummyBackend);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Vigilant AI Gateway running on port ${PORT}`);
});
