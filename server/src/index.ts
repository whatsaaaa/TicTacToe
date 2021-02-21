import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { configure, format, transports } from "winston";
import { Container } from "typedi";
import cors from "cors";
import http from "http";

import GameResolver from "./graphql/resolvers/GameResolver";
import RoundResolver from "./graphql/resolvers/RoundResolver";
import MoveResolver from "./graphql/resolvers/MoveResolver";
import SubscriptionResolver from "./graphql/resolvers/SubscriptionResolver";


async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [GameResolver, RoundResolver, MoveResolver, SubscriptionResolver],
    emitSchemaFile: true,
    container: Container
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const app = express();

  app.use("*", cors());

  const httpServer = http.createServer(app);

  server.applyMiddleware({ app, path: "/graphql" });
  server.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
}

function winstonBuilder() {
  configure({
    transports: [
      new transports.Console({
        level: "debug",
        handleExceptions: true,
        format: format.combine(format.colorize(), format.simple())
      })
    ]
  });
}

winstonBuilder();
bootstrap();

