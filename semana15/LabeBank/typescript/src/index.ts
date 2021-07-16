import express from "express";
import cors from "cors";

const serverPort = process.env.NODE_PORT || 3003;

const app = express();
app.use(express.json());
app.use(cors());

const server = app.listen(serverPort, () => {
  if (server)
    //eslint-disable-next-line no-console
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line no-console
    console.error("Failure upon starting server.");
});
