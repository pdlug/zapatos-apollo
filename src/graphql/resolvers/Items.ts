import { QueryResolvers, MutationResolvers } from "../../generated/resolver-types";

import * as DB from "../../db";
import { formatISO } from "date-fns";

const items: QueryResolvers["items"] = async (_root, { q }, { db }) => {
  return q ? await DB.Items.search(db, q) : await DB.Items.all(db);
};

const item: QueryResolvers["item"] = async (_root, { id }, { db }) => {
  return await DB.Items.getById(db, id);
};

const createItem: MutationResolvers["createItem"] = async (_root, { input }, { db }) => {
  const publishedOn = input.publishedOn ?? formatISO(new Date(), { representation: "date" });

  const item = await DB.Items.create(db, {
    ...input,
    publishedOn,
    keywords: input.keywords ?? [],
  });

  return item;
};

const updateItem: MutationResolvers["updateItem"] = async (_root, { id, input }, { db }) => {
  const item = await DB.Items.update(db, id, {
    ...(input.title && { title: input.title }),
    ...(input.content !== undefined && { content: input.content }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.keywords && { keywords: input.keywords }),
    ...(input.publishedOn && { publishedOn: input.publishedOn }),
  });

  return item;
};

const deleteItem: MutationResolvers["deleteItem"] = async (_root, { id }, { db }) => {
  return await DB.Items.deleteById(db, id);
};

export const Query = {
  items,
  item,
};

export const Mutation = {
  createItem,
  updateItem,
  deleteItem,
};
