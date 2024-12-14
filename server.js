const http = require("http");
const fs = require("fs");
const path = require("path");

/**
 * A simple server that returns a webpage,
 * or streams json from a file to the client.
 */
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "src", "index.html");
    fs.readFile(filePath, (_, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

    return;
  }

  if (req.method === "GET" && req.url === "/json") {
    res.writeHead(200, { "Content-Type": "application/json" });

    console.log("Streaming JSON data...");

    // set up a readable stream
    const filePath = path.join(__dirname, "src", "asset.json");
    const stream = fs.createReadStream(filePath, { encoding: "utf8" });

    // read the stream on byte (character) at a time and send it to the client
    stream.on("readable", function () {
      const interval = setInterval(() => {
        const chunk = stream.read(1);
        if (chunk !== null) {
          res.write(chunk);
        } else {
          clearInterval(interval);
          res.end();
        }
      }, 2);
    });

    return;
  }

  // 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
