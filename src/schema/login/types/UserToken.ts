import { ObjectType, Field } from "type-graphql";
import { Users } from "../../../entity/Users";

@ObjectType("userToken")
export class UserToken {
  @Field(() => String)
  token: string;

  @Field(() => Users)
  user: Users;
}
