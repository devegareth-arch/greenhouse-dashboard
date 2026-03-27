const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const filePath = req.url === "/" ? "/index.html" : req.url;
  const ext = path.extname(filePath);

  let contentType = "text/html";
  if (ext === ".js") contentType = "text/javascript";
  if (ext === ".css") contentType = "text/css";

  fs.readFile(__dirname + filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
