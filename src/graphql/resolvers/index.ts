import { Resolvers, QueryResolvers, MutationResolvers } from "../../generated/resolver-types";

import * as db from "../../db";
import { formatISO } from "date-fns";

const items: QueryResolvers["items"] = async (_root, { q }) => {
  return q ? await db.Items.search(db.pool, q) : await db.Items.all(db.pool);
};

const item: QueryResolvers["item"] = async (_root, { id }) => {
  return await db.Items.getById(db.pool, id);
};

const createItem: MutationResolvers["createItem"] = async (_root, { input }) => {
  const publishedOn = input.publishedOn ?? formatISO(new Date(), { representation: "date" });

  const item = await db.Items.create(db.pool, {
    ...input,
    publishedOn,
    keywords: input.keywords ?? [],
  });

  return item;
};

const updateItem: MutationResolvers["updateItem"] = async (_root, { id, input }) => {
  const item = await db.Items.update(db.pool, id, {
    ...(input.title && { title: input.title }),
    ...(input.content !== undefined && { content: input.content }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.keywords && { keywords: input.keywords }),
    ...(input.publishedOn && { publishedOn: input.publishedOn }),
  });

  return item;
};

const deleteItem: MutationResolvers["deleteItem"] = async (_root, { id }) => {
  return await db.Items.deleteById(db.pool, id);
};

export const resolvers: Required<Pick<Resolvers, "Mutation" | "Query">> = {
  Query: {
    items,
    item,
  },
  Mutation: {
    createItem,
    updateItem,
    deleteItem,
  },
};
