import { Knex } from "knex";
import { Friend } from "./friend";
import { LikeDatabase } from "./like";
import { PostDatabase } from "./post";
import { User } from "./user";

export * from "./commons";
export * from "./user";
export * from "./post";
export * from "./like";
export * from "./data";
export * from "./friend";

//Veja https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables {
    LaBook_User: User;
    LaBook_User_composite: Knex.CompositeTableType<User, User, Omit<User, "id">>;
    LaBook_Post: PostDatabase;
    LaBook_Post_composite: Knex.CompositeTableType<
      PostDatabase,
      PostDatabase,
      Omit<PostDatabase, "id" | "author_id" | "created_at">
    >;
    LaBook_Like: LikeDatabase;
    LaBook_Like_composite: Knex.CompositeTableType<
      LikeDatabase,
      LikeDatabase,
      Omit<LikeDatabase, "user_id" | "post_id">
    >;
    LaBook_Friend: Friend;
    LaBook_Friend_composite: Knex.CompositeTableType<Friend>;
  }
}
