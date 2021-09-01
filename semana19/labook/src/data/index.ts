import knex from "knex";
import {
  CommentData,
  FriendData,
  LikeData,
  PostData,
  UserData
} from "../@types";
import {
  UserDatabaseSQL,
  PostDatabaseSQL,
  FriendDatabaseSQL,
  LikeDatabaseSQL,
  CommentDatabaseSQL
} from "./databaseSQL";

export * from "./databaseSQL";

const databaseConnection = knex({
  client:     process.env.DATABASE_TYPE,
  connection: {
    host:               process.env.DATABASE_HOST,
    port:               Number(process.env.DATABASE_PORT),
    database:           process.env.DATABASE_SCHEMA,
    user:               process.env.DATABASE_USER,
    password:           process.env.DATABASE_PASSWORD,
    multipleStatements: true
  }
});

export const userData: UserData = new UserDatabaseSQL(databaseConnection);
export const postData: PostData = new PostDatabaseSQL(databaseConnection);
export const friendData: FriendData = new FriendDatabaseSQL(databaseConnection);
export const likeData: LikeData = new LikeDatabaseSQL(databaseConnection);
export const commentData: CommentData = new CommentDatabaseSQL(databaseConnection);
