import jwt from "jsonwebtoken";
import { Users } from "../entity/Users";

export const createToken = ({ user }: { user: Users }) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.SECRET!,
    { expiresIn: process.env.TOKEN_LIFE }
  );
  return { user, token };
};

export const verifyToken = async ({
  token,
  authorization,
}: {
  token?: string;
  authorization?: string;
}) => {
  if (token) {
    try {
      const result = <
        { id: string; username: string; firstName: string; lastName: string }
      >jwt.verify(token, process.env.SECRET!);
      return {
        id: result.id,
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
      };
    } catch (error) {
      return null;
    }
  }

  return null;
};
