const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
mongoose.connect('mongodb+srv://ahsan:1234ahsan@rest.tbdkr.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.listen(3000, () => {
  console.log("Server is running at port 3000");
});