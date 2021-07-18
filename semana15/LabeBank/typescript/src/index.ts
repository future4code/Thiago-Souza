import express from "express";
import cors from "cors";
import {
  createAccount,
  getAccount,
  getAllAccounts,
  getBalance,
  checkName,
  getStaments,
  makeDeposit,
  makePaymentScheduling,
  makeTransfer
} from "./handlers/accounts";

const serverPort = process.env.NODE_PORT || 3003;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/accounts", getAllAccounts);
app.post("/accounts", createAccount);
app.get("/accounts/:cpf/balance", getAccount, getBalance);
app.get("/accounts/:cpf/statements", getAccount, getStaments);
app.put("/accounts/:cpf/deposit", getAccount, checkName, makeDeposit);
app.post("/accounts/:cpf/payment", getAccount, checkName, makePaymentScheduling);
app.post("/accounts/:cpf/transfer", getAccount, checkName, makeTransfer);

const server = app.listen(serverPort, () => {
  if (server)
    //eslint-disable-next-line no-console
    console.log(`Server is running in http://localhost:${serverPort}`);
  else
    //eslint-disable-next-line no-console
    console.error("Failure upon starting server.");
});
