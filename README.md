# Typescript GraphQL server using Apollo + Zapatos (PostgreSQL)

This is a fully functional example of a GraphQL server that uses [Apollo Server](https://www.apollographql.com/docs/apollo-server/) with PostgreSQL as a backing datastore. The [Zapatos](https:// jawj.github.io/zapatos/) "zero-abstraction" PostgreSQL library is used to generate Typescript types from the database schema and provide typesafe utilities for queries. [GraphQL code generator](https://graphql-code-generator.com/) is used to generate types from the GraphQL schema for the resolvers. Using both of these we're able to achieve a reasonably good level of end-to-end typesafety from the GraphQL layer through to the database.

## Prerequisities

You'll need a basic node.js development environment with [yarn](https://yarnpkg.com/).

[dbmate](https://github.com/amacneil/dbmate) is used for database migrations:

```bash
$ brew install dbmate
```

## Setup

Install dependencies:

```bash
$ yarn install
```

Create a `.env` file with a database URL to use. Zapatos will create the database if it doesn't exist so it's fine to use:

```bash
DATABASE_URL="postgres://localhost/pg_graphql_dev?sslmode=disable"
```

Run `dbmate` to create the database and associated schema:

```bash
$ dbmate up
```

## Usage

Start the server with:

```bash
$ yarn run server
```

You can then use http://localhost:4000/graphql in GraphiQL or any other GraphQL client to interact. To get started see `examples/`.

## Development

If you modify the GraphQL schema you must run the `graphqlgen` script to regenerate the resolver types:

```bash
$ yarn run graphqlgen
```

If you modify the database schema you must run the `zapatos` script to regenerate types/helpers:

```bash
$ yarn run zapatos
```
