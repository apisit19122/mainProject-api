import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "../utils/userAuthChecker";

import { UserResolver } from "./users/Users";
import { AuthResolver } from "./login/auth";

export default async (): Promise<GraphQLSchema> => {
  try {
    const schema = await buildSchema({
      resolvers: [UserResolver, AuthResolver],
      authChecker: customAuthChecker,
    });
    return schema;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
