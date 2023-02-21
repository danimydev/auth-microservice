import http from "node:http";
import app from "./web";
import envConfig from "./config";

const server = http.createServer(app);

server.listen(envConfig.port, () => {
  console.log(`server started at ${envConfig.port}`);
});
