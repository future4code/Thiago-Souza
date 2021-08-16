import express, {Request, Response} from "express"
import {User} from "../../@types/users";
import {ApplicationError, HttpError, UnexpectHttpError} from "../../errors";
import {CreateUserSchema} from "../../validate/users";
import {createUser as createUserBusiness} from "../../business"

export const userRouter = express.Router()

userRouter.post("/signup", createUser);

async function validateBodyCreateUser(user: unknown) {
  try {
    await CreateUserSchema.validate(user, { abortEarly: false })
  } catch(error) {
    if(error.name === "ValidationError") 
      throw new HttpError("validate", "\n"+error.errors.join(",\n"), 400, error)

    console.error("Validate Body Create User:",error)
    throw new UnexpectHttpError(error)
  }
}

async function createUser(request: Request, response: Response): Promise<void> {
  const {name, email, password, role} = request.body;

  try {
    const newUser = { name, email, password, role } as User;
    await validateBodyCreateUser(newUser)

    const token = await createUserBusiness(newUser) 

    response.status(201).send({message: "User successfully created", token})
  } catch(error) {
    if(error instanceof HttpError) {
      response.status(error.httpStatus).send(error.getMessage())
      return
    }

    if(error instanceof ApplicationError) {
      if(error.name === "validate") {
        response.status(400).send(error.getMessage())
        return
      }

      if(error.name === "duplicateEmail") {
        response.status(409).send(error.getMessage())
        return
      }
    }

    console.error("Handler Create User:",error)
    const finalError = new UnexpectHttpError()
    response.status(finalError.httpStatus).send(finalError.getMessage())
  }
}

