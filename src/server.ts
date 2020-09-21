/* eslint-disable import/first, functional/no-expression-statement */
import dotenv from "dotenv";
process.env.NODE_ENV !== "production" && dotenv.config();

import { ApolloServer } from "apollo-server";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  GraphQL server ready at ${url}`);
});
