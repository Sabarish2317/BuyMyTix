const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./middleware/logger");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
// app.use(logger);
app.use(express.json());

const userRoute = require("./router/userRouter");
const cityRoute = require("./router/cityRouter");
const eventReferenceRoute = require("./router/eventReferenceRouter");
const ticketListingRoute = require("./router/ticketListingRouter");

app.get("/", (req, res) => {
  // Testing kaga
  res.status(200).send("BuyMyTix Api");
});

app.use("/api/", cityRoute); // search for citites (standalone api)
app.use("/api/Authenticate", userRoute); //(All user authenticaiton methods)
app.use("/api/", eventReferenceRoute); // CRUD event reference and search
app.use("/api/", ticketListingRoute); // CRUD titckets

mongoose
  .connect(process.env.MONGO_URI, { dbName: "BuyMyTix" })
  .then(() => console.log("connected to the database successfully"))
  .catch((err) => console.log("Error connected to the server", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
