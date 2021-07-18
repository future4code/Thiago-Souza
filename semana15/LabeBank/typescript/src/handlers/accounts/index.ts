import { Request, Response, NextFunction } from "express";
import { cpfLength, isValidCPF } from "../../utils";

export interface Statement {
  id: number;
  value: number;
  date: Date;
  description: string;
}

export interface Account {
  id: number;
  name: string;
  cpf:  string;
  dateOfBirth: Date;
  balance: number;
  statements: Statement[];
}

const accounts: Account[] = [];

/*eslint-disable max-len */
const errors = {
  requiredFields: (fields: unknown[]) => {
    const requireds = fields.join(", ");
    return `The following fields are requireds: ${requireds}`;
  },
  invalidName:              "The name must to be a string",
  invalidCPF:               "The cpf must to be a valid CPF and only numbers",
  invalidRecipientCPF:      "The cpf of the recipient must to be a valid CPF and only numbers",
  alreadyExist:             "The account already exist",
  invalidDateOfBirth:       "The dateOfBirth must to be a valid date in format YYYY-MM-DD",
  minimumAge:               "The minimum age is 18 years",
  accountNotFound:          "Account not found",
  recipientAccountNotFound: "Account of the recipient not found",
  invalidValue:             "The value must to be a number greater than 0",
  invalidDate:              "The date must to be a valid date in format YYYY-MM-DD",
  dateLessToday:            "The date can't be less than today's",
  paymentGreateBalance:     "The payment cannot be greater than balance",
  nameDiffAccount:          "The user name must be the same name saved in the account",
  recipientNameDiffAccount: "The name of the recipient must be the same name saved in his account"
};

function getNextId(array?: {id: number}[]): number {
  if (!array)
    array = accounts;

  if (!array.length)
    return 1;

  return array[array.length - 1].id + 1;
}

export function createAccount(request: Request, response: Response): void {
  const { name, cpf: cpfNotValidate, dateOfBirth } = request.body;
  if (!name || !cpfNotValidate || !dateOfBirth) {
    const fields = [
      "name",
      "cpf",
      "dateOfBirth"
    ];

    response.status(400).send(errors.requiredFields(fields));

    return;
  }

  if (!name || typeof name !== "string") {
    response.status(400).send(errors.invalidName);
    return;
  }

  if (!isValidCPF(cpfNotValidate)) {
    response.status(400).send(errors.invalidCPF);
    return;
  }

  const cpf = String(cpfNotValidate).padStart(cpfLength, "0");
  if (accounts.find((account) => account.cpf === cpf)) {
    response.status(400).send(errors.alreadyExist);
    return;
  }

  const timestamp = Date.parse(dateOfBirth);
  if (isNaN(timestamp)) {
    response.status(400).send(errors.invalidDateOfBirth);
    return;
  }

  const date = new Date(timestamp);
  const currentYear = new Date();
  if (date.getTime() > currentYear.setFullYear(currentYear.getFullYear() - 18)) {
    response.status(400).send(errors.minimumAge);
    return;
  }

  const newAccount: Account = {
    id:          getNextId(),
    name,
    cpf,
    dateOfBirth: new Date(timestamp),
    balance:     0,
    statements:  []
  };
  accounts.push(newAccount);

  response.status(201).send(newAccount);
}

export function getAllAccounts(_request: Request, response: Response): void {
  const accountsResponse = accounts.map(({ id, name, balance }) => ({
    id,
    name,
    balance
  }));

  response.send({
    quantity: accounts.length,
    accounts: accountsResponse
  });
}
export function getAccount(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { cpf } = request.params;
  if (!isValidCPF(cpf)) {
    response.status(400).send(errors.invalidCPF);
    return;
  }

  const index = accounts.findIndex((account) => account.cpf === cpf as string);
  if (index < 0) {
    response.status(404).send(errors.accountNotFound);
    return;
  }

  response.locals.account = accounts[index];
  response.locals.accountIndex = index;

  next();
}

export function checkName(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const account = response.locals.account as Account;
  const { name } = request.query;

  if (account.name !== name) {
    response.status(400).send(errors.nameDiffAccount);
    return;
  }

  next();
}

export function getBalance(_request: Request, response: Response): void {
  const { account } = response.locals;

  response.send({
    id:      account.id,
    name:    account.name,
    cpf:     account.cpf,
    balance: account.balance
  });
}

export function getStaments(_request: Request, response: Response): void {
  const { account } = response.locals;

  response.send({
    id:         account.id,
    name:       account.name,
    cpf:        account.cpf,
    balance:    account.balance,
    statements: account.statements
  });
}

export function makeDeposit(request: Request, response: Response): void {
  const { value, name } = request.body;
  if (!value || !name) {
    response.status(400).send(errors.requiredFields([ "value", "name" ]));
    return;
  }

  const deposity = Number(value);
  if (typeof value !== "string" || !isFinite(deposity) || deposity <= 0) {
    response.status(400).send(errors.invalidValue);
    return;
  }

  const account = response.locals.account as Account;

  let index = 0;
  while (accounts[index] !== account)
    index++;

  accounts[index].balance += deposity;
  accounts[index].statements.push({
    id:          getNextId(accounts[index].statements),
    value:       deposity,
    date:        new Date(),
    description: "Depósito de dinheiro"
  });

  response.send(201).send("The deposit was made");
}

export function makePaymentScheduling(request: Request, response: Response): void {
  const {
    date, value, name, description
  } = request.body;
  if (!value || !name || !description) {
    const fields = [
      "value",
      "name",
      "description"
    ];
    response.status(400).send(errors.requiredFields(fields));
    return;
  }

  const payment = Number(value);
  if (typeof value !== "string" || !isFinite(payment) || payment <= 0) {
    response.status(400).send(errors.invalidValue);
    return;
  }

  const timestamp = Date.parse(date);
  if (date && isNaN(timestamp)) {
    response.status(400).send(errors.invalidDate);
    return;
  }

  const datePayment = new Date(date ? timestamp : "");
  const today = new Date();
  if (datePayment.getTime() < today.getTime()) {
    response.status(400).send(errors.dateLessToday);
    return;
  }

  const account = response.locals.account as Account;
  const index = response.locals.accountIndex as number;

  if (datePayment === today) {
    if (payment < account.balance) {
      response.status(400).send(errors.paymentGreateBalance);
      return;
    }
    accounts[index].balance -= payment;
  }

  accounts[index].statements.push({
    id:    getNextId(accounts[index].statements),
    date:  datePayment,
    value: -value,
    description
  });
}

export function makeTransfer(request: Request, response: Response): void {
  const { value, cpf, name } = request.body;
  if (!cpf || !value || !name) {
    const fields = [
      "cpf",
      "value",
      "name"
    ];
    response.status(400).send(errors.requiredFields(fields));
    return;
  }

  if (!isValidCPF(cpf)) {
    response.status(400).send(errors.invalidRecipientCPF);
    return;
  }

  const recipientIndex = accounts.findIndex((account) => account.cpf === cpf);
  if (recipientIndex < 0) {
    response.status(404).send(errors.recipientAccountNotFound);
    return;
  }

  if (accounts[recipientIndex].name !== name) {
    response.status(400).send(errors.recipientNameDiffAccount);
    return;
  }

  const transfer = Number(value);
  if (typeof value !== "string" || !isFinite(transfer) || transfer <= 0) {
    response.status(400).send(errors.invalidValue);
    return;
  }

  const senderIndex = response.locals.accountIndex as number;

  if (accounts[senderIndex].balance < transfer) {
    response.status(400).send(errors.paymentGreateBalance);
    return;
  }

  const today = new Date();

  accounts[recipientIndex].balance += transfer;
  accounts[senderIndex].balance -= transfer;

  accounts[recipientIndex].statements.push({
    id:          getNextId(accounts[recipientIndex].statements),
    value:       transfer,
    date:        today,
    description: `Transferencia de ${accounts[senderIndex].name}`
  });

  accounts[senderIndex].statements.push({
    id:          getNextId(accounts[senderIndex].statements),
    value:       transfer,
    date:        today,
    description: `Transferencia para ${accounts[recipientIndex].name}`
  });

  response.status(201).send("Transfer performed successfully");
}
