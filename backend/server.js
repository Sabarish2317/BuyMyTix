const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const userRoute = require("./router/userRouter");
const cityRoute = require("./router/cityRouter");
app.use("/api/", cityRoute);
app.use("/api/Authenticate", userRoute);

// const ticketRoute = require("./router/ticketRouter");
// app.use("/ticket", ticketRoute);

// const searchRoute = require("./router/searchRouter");
// app.use("/", searchRoute);

// const homeRoute = require("./router/homeRouter");
// app.use("/home", homeRoute);

mongoose
  .connect(process.env.MONGO_URI, { dbName: "BuyMyTix" })
  .then(() => console.log("connected to the database successfully"))
  .catch((err) => console.log("Error connected to the server", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
