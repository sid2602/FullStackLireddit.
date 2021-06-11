import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__, COOKIE_NAME } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import sendEmail from "./utils/sendEmail";
// import { User } from "./entities/User";

const main = async () => {
  sendEmail("sidhd2602@gmail.com", "hello world");
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // await orm.em.nativeDelete(User, {});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "foqiirneqeoicnjae921u4-21idij(_jE9-  1",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res, redis }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: { origin: false },
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main();
