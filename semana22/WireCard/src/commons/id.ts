import { v1 as uuidV1 } from "uuid";
import { ID } from "../@types";

export function generateId(): ID {
  return uuidV1();
}
