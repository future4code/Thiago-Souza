import { Request, Response } from "express";
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

const errors = {
  requiredFields: (fields: unknown[]) => {
    const requireds = fields.join(", ");
    return `The following fields are requireds: ${requireds}`;
  },
  invalidName:        "The name need to be a string",
  invalidCPF:         "The cpf need to be a valid CPF and only numbers",
  alreadyExist:       "The account already exist",
  invalidDateOfBirth: "The dateOfBirth need to be a valid date informat DD-MM-YYYY",
  minimumAge:         "The minimum age is 18 years",
  accountNotFound:    "Account not found"
};

function getNextId(): number {
  if (!accounts.length)
    return 1;

  return accounts[accounts.length - 1].id + 1;
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

function getAccount(cpf: unknown): [Account | undefined,  string] {
  if (!isValidCPF(cpf))
    return [ undefined, errors.invalidCPF ];

  const account = accounts.find((account) => account.cpf === cpf as string);
  if (!account)
    return [ undefined, errors.accountNotFound ];

  return [ account, "" ];
}

export function getBalance(request: Request, response: Response): void {
  const [ account, error ] = getAccount(request.params.cpf);
  if (error || !account) {
    if (error === errors.accountNotFound) {
      response.status(404).send(error);
      return;
    }

    response.status(400).send(error);
    return;
  }

  response.send({
    id:      account.id,
    name:    account.name,
    cpf:     account.cpf,
    balance: account.balance
  });
}

export function getStaments(request: Request, response: Response): void {
  const [ account, error ] = getAccount(request.params.cpf);
  if (error || !account) {
    if (error === errors.accountNotFound) {
      response.status(404).send(error);
      return;
    }

    response.status(400).send(error);
    return;
  }

  response.send({
    id:         account.id,
    name:       account.name,
    cpf:        account.cpf,
    balance:    account.balance,
    statements: account.statements
  });
}
