const express = require("express");
const req = require("express/lib/request");
const data = require("./data.json");
const app = express();
const portListen = 3000;

/*
 * Setting the view engine to "Pug"
 */
app.set("view engine", "pug");

/*
 * Serving the Static Files
 */
app.use("/static", express.static("public"));

/*
 * Routes
 */

app.get("/", (req, res) => {
  res.locals.data = data.projects;
  res.render("index", { data });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res, next) => {
  const id = req.params.id;
  const project = data.projects[id];
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Project ${id} does not exist`;
    next(err);
  }
});

/*
 *404 Error Handler
 */
app.use((req, res, next) => {
  const err = new Error(
    "Oops! Looks like that page doesn't exist! Please check you are using the correct URL!"
  );
  err.status = 404;
  next(err);
});
/*
 * Global Error Handler
 */
app.use((err, req, res) => {
  err.message = err.message || "Looks like there was a server error!";
  res.status(err.status || 500);
  console.log(`Looks like you have encountered a ${err.status} error!`);
  res.send(`Error Code: ${res.status} : ${err.message}`);
});
/*
 * Setting up the port - Port number can be changed in const variable at the top
 */
app.listen(portListen, () => {
  console.log(`The app is listening on port ${portListen}`);
});
