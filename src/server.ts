/* eslint-disable import/first, functional/no-expression-statement */
import dotenv from "dotenv";
process.env.NODE_ENV !== "production" && dotenv.config();

import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import { resolvers } from "./graphql/resolvers";

import * as DB from "./db";
import { Context } from "./graphql/types";

const databaseURL = process.env.DATABASE_URL;
if (!databaseURL) {
  console.log("Database URL not configured!");
  process.exit(1);
}

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/graphql/schema.graphql"), "utf8")}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }): Promise<Context> => ({
    db: await DB.connect({ url: databaseURL }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  GraphQL server ready at ${url}`);
});
