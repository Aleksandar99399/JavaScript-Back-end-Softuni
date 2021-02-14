const fs = require("fs");
const url = require("url");
const http = require("http");

function replaceHead(page) {
  let tem = page.replace("{%HEADTEMP%}", headTemp);
  return tem;
}
function replaceNav(page) {
  let tem = page.replace("{%NAVTEMP%}", navTemp);
  return tem;
}

const readIndexPage = fs.readFileSync(
  `${__dirname}/resources/views/home/index.html`,
  "utf-8"
);
const readAddBreedPage = fs.readFileSync(
  `${__dirname}/resources/views/addBreed.html`,
  "utf-8"
);
const readAddCatPage = fs.readFileSync(
  `${__dirname}/resources/views/addCat.html`,
  "utf-8"
);
const headTemp = fs.readFileSync(
  `${__dirname}/resources/views/templates/headTemp.html`,
  "utf-8"
);
const navTemp = fs.readFileSync(
  `${__dirname}/resources/views/templates/navTemp.html`,
  "utf-8"
);

http
  .createServer((req, res) => {
    const path = url.parse(req.url).pathname;

    if (path === "/") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      res.end(replaceNav(replaceHead(readIndexPage)));
    } else if (path === "/addBreed") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      res.end(replaceNav(replaceHead(readAddBreedPage)));
    } else if (path === "/addCat") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      res.end(replaceNav(replaceHead(readAddCatPage)));
    }
  })
  .listen(5000);
