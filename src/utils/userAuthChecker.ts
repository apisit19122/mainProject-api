import { AuthChecker } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const customAuthChecker: AuthChecker<MyContext> = (
  { root, args, context, info },
  roles
) => {
  return context.users !== null; // true | false
};
