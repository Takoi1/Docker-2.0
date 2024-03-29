const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/item");

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const connectExternalNetwork= "mongodb://localhost:27018/my-db"
const connectInternalNetwork= "mongodb://mongodb-service:27017/my-db"

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27018/my-db", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err , "erroooorr"));

app.get("/", (req, res) => {
  res.send("Hello World -tt !");
});

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.send({ items }))
    .catch((err) => res.status(500).json({ err }));
});

app.post("/items/add", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => res.send({ message: "item saved successfully", item }))
    .catch((err) => res.status(500).json({ err }));
});

const port = 3000;

app.listen(port, () => console.log("Server running..."));