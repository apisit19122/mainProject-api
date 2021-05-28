import { Resolver, Mutation, Arg, Ctx, ObjectType, Field } from "type-graphql";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { Users } from "../../entity/Users";
import { UserToken } from "./types/UserToken";
import { createToken } from "../../utils/tokenHandler";

@ObjectType()
export class ResponseMessage {
  @Field()
  massage: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => Users, { nullable: true })
  async signup(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Arg("firstName", () => String) firstName: string,
    @Arg("lastName", () => String) lastName: string
  ): Promise<Users | null> {
    try {
      const isUsername = await Users.findOne({ where: { username } });

      if (isUsername) {
        throw new Error("Username already exist");
      }

      if (password.length < 6) {
        throw new Error("Password must be at last 6 charaters.");
      }

      const hashedPassword = await bcryptjs.hashSync(password, 10);
      const newUser = await Users.create({
        id: uuidv4(),
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => UserToken, { nullable: true })
  async signin(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string
  ): Promise<UserToken | null> {
    try {
      // console.log(email, password);

      const userAccount = await Users.findOne({ where: { username } });
      let userResult = userAccount;

      if (!userResult) throw new Error("User not found, please sign up.");

      const isPasswordValid = await bcryptjs.compare(
        password,
        userResult.password
      );

      if (!isPasswordValid) throw new Error("Invalid username or password!");

      const token = await createToken({ user: userResult });

      return token;
    } catch (error) {
      throw error;
    }
  }

  // @Mutation(() => ResponseMessage, { nullable: true })
  // async signout(
  //   @Ctx() { req, res }: AppContext
  // ): Promise<ResponseMessage | null> {
  //   try {
  //     const user = await Users.findById(req.userId);
  //     if (!user) return null;

  //     // Up token version
  //     user.tokenVersion = user.tokenVersion + 1;
  //     await user.save();

  //     // CLear cookie in the forntEnd
  //     res.clearCookie(process.env.COOKIE_NAME!);

  //     return { massage: "User logout system." };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Mutation(() => Users, { nullable: true })
  // async editRoles(@Arg("roles") roles: string, @Ctx() { req }: AppContext) {
  //   try {
  //     if (req.userId) throw new Error("Not requset user..");
  //     const user = await Users.findById(req.userId);
  //     if (!user) throw new Error("Not user..");

  //     const userUpdate = await user.update({
  //       roles: roles,
  //     });

  //     if (userUpdate) {
  //       user.save();
  //       return userUpdate;
  //     }
  //     return null;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
