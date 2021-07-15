import { Request, Response } from "express";
import { emailRegex } from "../../utils";
import users from "../../data/users.json";

export type User = {
  id: number,
  name: string,
  email: string,
  type: "ADMIN" | "NORMAL",
  age: number
}

function getNxtId(): number {
  return users[users.length - 1].id + 1;
}

export function getAllUsers(_request: Request, response: Response): void {
  response.send(users);
}

export function searchUsers(request: Request, response: Response): void {
  const { type, name } = request.query;

  if (!type && !name) {
    response.status(400).send("The request query parms need a name or type");
    return;
  }

  if (type && type !== "ADMIN" && type !== "NORMAL") {
    response.status(400).send("The type need to be ADMIN or NORMAL");
    return;
  }

  if (name && typeof name !== "string") {
    response.status(400).send("The name need to be a String");
    return;
  }

  const nameRegex = new RegExp(name || "", "i");

  const usersResponse = users.filter((user) => {
    if (type && user.type !== type)
      return false;

    if (name && !user.name.match(nameRegex))
      return false;

    return true;
  });

  if (!usersResponse.length) {
    response.status(404).send("Users not found");
    return;
  }

  response.send(usersResponse);
}

export function createUser(request: Request, response: Response): void {
  const {
    name, email, type, age
  } = request.body;
  if (!name || !email || !type || !age) {
    response.status(400)
      .send("Name, email, type and age are required to create a user");
    return;
  }

  if (typeof name !== "string") {
    response.status(400)
      .send("Name need to be a string");
    return;
  }

  if (typeof email !== "string" && !email.match(emailRegex)) {
    response.status(400).send("The email need to be a valid email");
    return;
  }

  if (type !== "ADMIN" && type !== "NORMAL") {
    response.status(400).send("The type need to be ADMIN or NORMAL");
    return;
  }

  if (typeof age !== "string") {
    response.status(400).send("The age need to be a positive integer");
    return;
  }

  const ageNumber = Number(age);
  if (!Number.isInteger(ageNumber)) {
    response.status(400).send("The age need to be a positive integer");
    return;
  }

  users.push({
    id:  getNxtId(),
    name,
    email,
    age: ageNumber,
    type
  });

  response.status(201).send("User created");
}
