import express from "express";
import cors from "cors";
import {
  createAccount, getAllAccounts, getBalance, getStaments
} from "./handlers/accounts";

const serverPort = process.env.NODE_PORT || 3003;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/accounts", getAllAccounts);
app.post("/accounts", createAccount);
app.get("/accounts/:cpf/balance", getBalance);
app.get("/accounts/:cpf/statements", getStaments);

const server = app.listen(serverPort, () => {
  if (server)
    //eslint-disable-next-line no-console
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line no-console
    console.error("Failure upon starting server.");
});
