///////////////////////
//INTRODUCTION TO EXPRESS
const express = require("express");

const app = express();

const port = 3000;

///////////////////////
//ROUTE METHODS
//get method ROUTER
app.get("/", (req, res) => {
  res.status(200);

  res.send("Welcome to Express.js!");
});

//post method route
app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

//put method route
app.put("/", (req, res) => {
  res.send("PUT request to the homepage");
});

//all methods route
app.all(
  "/about",
  (req, res, next) => {
    console.log("Middleware execution..");

    next();
  },
  (req, res) => {
    res.send("Show about page.");
  }
);

/////////////////////
// ROUTER PATHS
//Based String pattern
app.get("*", (req, res) => {
  res.send("Matches everything");
});

//Base regular expression
app.get("/ab*cd", (req, res) => {
  res.send("abcd, abANYTHINGcd");
});

app.get(/.*fly$/, (req, res) => {
  res.send("butterfly, dragonfly");
});

/////////////////////
// EXTRACTING PARAMETERS
//path with parameter
app.get("/users/:userId", (req, res) => {
  const paramsObj = req.params;

  res.send(paramsObj);
});

//path with validate parameter
app.get("/users/:userId(\\d+)", (req, res) => {
  const paramsObj = req.params;

  res.send(paramsObj);
});

/////////////////////////////////
// CHAINABLE ROUTES
// Route all for this path
app
  .route("/home")

  .get((req, res) => {
    res.send("GET home page");
  })

  .post((req, res) => {
    res.send("POST home page");
  })

  .all((req, res) => {
    res.send("Everything else");
  });

///////////////////////////////
// ROUTER RESPONSES

//res.download - prompt a file to be downloaded
app.get("/pdf", (req, res) => {
  res.download("FULL PATH TO PDF");
});
//res.end - end the responce process
//res.json - send a JSON response

//res.redirect - redirect a request (to another page)
app.get("/about/old", (req, res) => {
  res.redirect("/about");
});

//res.sendFile - send a file as an octet stream
app.get("/file/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  res.sendFile("PATH TO FILE" + fileName);
});
//res.render - render a view template

//////////////////////////////
//MODULAR ROUTES
// дефиниране на манипулатори за маршрути
const express = require("express");

const router = express.Router();

router.use(/* add middleware */);

router.get(/* define route handlers */);

app.use("/about", router);

/////////////////////////////////////
// MIDDLEWARE
//const app = express()

app.use((req, res, next) => {
  console.log("Time:", Date.now());

  next();
});
//////////////////
// CUSTOM MIDDLEWARE
app.use("/user/:userId", (req, res, next) => {
  const userId = req.params.userId;

  // TODO: Check if user exists in db/session

  let userExists = true;

  if (!userExists) {
    res.redirect("/login");
  } else {
    next();
  }
});

app.get("/user/:userId", (req, res) => {
  res.send("User home page!");
});

// Application level
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});
// Error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);

  res.status(500).send("Something broke!");
});

///////////////////////////////////
// THIRD-PARTY MIDDLEWARE
app.set("view engine", "pug");

app.set("views", __dirname + "/views");

app.use(cookieParser());

app.use(session({ secret: "magic unicorns" }));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(config.rootPath + "/public"));

/////////////////////////////////////////
// STATIC FILES
// Serving static files
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use("/static", express.static(__dirname + "/public"));
// And all files from directory will be public
// http: //localhost:3000/images/kitten.jpg
// http: //localhost:3000/css/style.css
// http: //localhost:3000/js/app.js
// http: //localhost:3000/images/bg.png
// http: //localhost:3000/hello.html

//////////////////////////////////////
// INTEGRATION IN EXPRESS - HANDLEBARS
//npm install express-handlebars
const app = require("express")();

const handlebars = require("express-handlebars");

app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

// For-loops
// const context = {
//   contacts: [
//   { name: 'Maria Petrova', email: 'mar4eto@abv.bg'},
//   { name: 'Jordan Kirov', email: 'jordk@gmail.com'}
//   ]};
//   <ul id="contacts">
//   {{#each contacts}}
//   <li>{{name}}: {{email}}</li>
//   {{else}}  - ако array е празен
//   <i>(empty)<i></i>
//   {{/each}} 
//   </ul>

// If-else
// {{#if sunny}}
// The sky is clear
// {{else}}
// The sky is overcast
// {{/if}}

// Partials
// Templates inserted into other templates
//<div id="contacts">
//{{#each contacts}}
//{{> contact}}
//{{else}}
//<i>(empty)<i>
//{{/each}}
//</div>

//triple stash against HTML-escaped


app.listen(port, () => console.log(`Express running on port: ${port}...`));
