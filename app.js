const express = require("express");
const data = require("./data.json");
const app = express();

app.set("view engine", "pug");

app.use(express.static("./public"));
app.use(data);
