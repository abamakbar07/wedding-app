const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI_2;

// const { client } = require('./config/index');
const routes = require("./src/routes");


// const { MongoClient } = require('mongodb');
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use("/api/v1/", routes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  mongoose.connect(uri, err => {
    if (err) console.error(err)
    else console.log(">>> Mongo connected")
  })
});

