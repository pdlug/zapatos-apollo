/* eslint-disable import/first, functional/no-expression-statement */
import dotenv from "dotenv";
process.env.NODE_ENV !== "production" && dotenv.config();

import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import { resolvers } from "./graphql/resolvers";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/graphql/schema.graphql"), "utf8")}
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  GraphQL server ready at ${url}`);
});
