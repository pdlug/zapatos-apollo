import { gql } from "apollo-server";

export const typeDefs = gql`
  type Item {
    id: ID!
    title: String!
    description: String
    content: String
    keywords: [String!]!
  }

  type Query {
    items(q: String): [Item!]!
    item(id: ID!): Item
  }

  input CreateItemInput {
    title: String!
    description: String
    content: String
    keywords: [String!]
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item
    deleteItem(id: ID!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
