import "./env";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import files from "fs";
import yaml from "yaml";
const swaggerDocument2 = yaml.parse(files.readFileSync("./src/swagger.yml", "utf8"));

const serverPort = process.env.NODE_PORT || 3003;

export const server = express();
server.use(express.json());
server.use(cors());
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument2));

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    console.info(`Server is running in http://localhost:${serverPort}`);
  else
    console.error("Failure upon starting server.");
});

import "./routes";
