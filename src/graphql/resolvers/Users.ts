import { QueryResolvers, MutationResolvers } from "../../generated/resolver-types";

import * as DB from "../../db";

const users: QueryResolvers["users"] = async (_root, { q }, { db }) => {
  return q ? await DB.Users.search(db, q) : await DB.Users.all(db);
};

const user: QueryResolvers["user"] = async (_root, { id }, { db }) => {
  return await DB.Users.getById(db, id);
};

const registerUser: MutationResolvers["registerUser"] = async (_root, { input }, { db }) => {
  return await DB.Users.create(db, input);
};

export const Query = {
  users,
  user,
};

export const Mutation = {
  registerUser,
};
