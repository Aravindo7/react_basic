const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", router);

mongoose
  .connect(
    "mongodb+srv://wwwaravind60:BjPaiWlrvufctaHO@cluster0.cwgrku2.mongodb.net/form",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//console.log('Aravind');
