import "./env";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import files from "fs";
import yaml from "yaml";

const docs = yaml.parse(files.readFileSync(process.env.DOCS_PATH as string, "utf8"));

const serverPort = process.env.NODE_PORT || 3003;

export const server = express();
server.use(express.json());
server.use(cors());
server.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

const serverListener = server.listen(serverPort, () => {
  if (serverListener)
    console.info(`Server is running in http://localhost:${serverPort}`);
  else
    console.error("Failure upon starting server.");
});

import "./routes";
