import { createServer } from "http";
import { readFile } from "fs";
import { resolve } from "path";
import { parse } from "querystring";

const server = createServer((req, res) => {
  switch (req.url) {
    case "/status": {
      res.writeHead(200);
      res.write("OK");
      res.end();
      return;
    }
    case "/json": {
      res.writeHead(200, {
        "Content-Type": "application",
      });
      res.write(
        JSON.stringify({
          status: "OK",
        })
      );
      res.end();
      break;
    }
    case "/sign-in": {
      const path = resolve(__dirname, "./pages/sing-in.html");
      readFile(path, (error, file) => {
        if (error) {
          res.writeHead(500, "Can't process HTML file.");
          res.end();
          return;
        }
        res.writeHead(200);
        res.write(file);
        res.end();
      });
      break;
    }
    case "/authenticate": {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const params = parse(data);
        res.writeHead(301, {
          Location: "/home",
        });
        res.end();
      });
      break;
    }
    case "/home": {
      const path = resolve(__dirname, "./pages/home.html");
      readFile(path, (error, file) => {
        if (error) {
          res.writeHead(500, "Can't process HTML file.");
          res.end();
          return;
        }
        res.writeHead(200);
        res.write(file);
        res.end();
      });
      break;
    }
    default: {
      res.writeHead(404, "Service not found");
      res.end();
    }
  }
});
const ip = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

server.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
