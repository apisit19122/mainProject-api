import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import "./env";
import "./entity";
import schema from "./schema";
import { verifyToken } from "./utils/tokenHandler";
import { version } from "./version";

const PORT = process.env.PORT || 3001;

const createServer = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  const server = new ApolloServer({
    schema: await schema(),
    context: async ({ req }: { req: express.Request }) => {
      const token = req.headers["x-token"] || "";
      const authorization = req.headers.authorization;
      const users = await verifyToken(<
        { token: string; authorization: string }
      >{ token, authorization });

      return { users, token };
      // return { users: { username: "asd" }, token };
    },
  });

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(`--- version ${version} ---`);
  });
};

createServer();
