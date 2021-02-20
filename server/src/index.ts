import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import GameResolver from "./graphql/resolvers/GameResolver";
import RoundResolver from "./graphql/resolvers/RoundResolver";
import MoveResolver from "./graphql/resolvers/MoveResolver";


async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [GameResolver, RoundResolver, MoveResolver],
    emitSchemaFile: true
  });

  const app = express();
  const server = new ApolloServer({
    schema,
    playground: true
  });

  app.use("*", cors());

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
}

bootstrap();

