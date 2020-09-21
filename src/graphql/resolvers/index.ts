import { Resolvers, QueryResolvers, MutationResolvers } from "../../generated/resolver-types";

import * as db from "../../db";

const items: QueryResolvers["items"] = async (_root, { q }) => {
  return q ? await db.Items.search(db.pool, q) : await db.Items.all(db.pool);
};

const item: QueryResolvers["item"] = async (_root, { id }) => {
  return await db.Items.getById(db.pool, id);
};

const createItem: MutationResolvers["createItem"] = async (_root, { input }) => {
  const item = await db.Items.create(db.pool, {
    title: input.title,
    description: input.description,
    content: input.content,
    keywords: input.keywords ? input.keywords : [],
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
    deleteItem,
  },
};
