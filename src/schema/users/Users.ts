import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  // Mutation,
  // Arg,
  // FieldResolver,
  // Root,
} from "type-graphql";
// import { ApolloError } from "apollo-server-express";
import { Users } from "../../entity/Users";
import { MyContext } from "../../types/MyContext";

@Resolver(() => Users)
export class UserResolver {
  @Authorized()
  @Query(() => String, { nullable: true })
  helloWorld(): string {
    return "Hello World";
  }

  @Authorized()
  @Query(() => [Users], { nullable: true })
  async allUsers(@Ctx() { users }: MyContext): Promise<Users[] | null> {
    const userData = await Users.findAll({});

    return userData;
  }
}
