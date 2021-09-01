import { ID } from "./commons";

export interface LikeDatabase {
  user_id: ID;
  post_id: ID;
}

export interface Like {
  userID: ID;
  portID: ID;
}
