import pg from "pg";

import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";

import type { User } from "../core";

type CreateUserProps = Pick<User, "email" | "name">;

/*
 * Create a new uesr, returns the newly created item
 */
export const create = async (pool: pg.Pool, user: CreateUserProps): Promise<User> => {
  return await db.insert("users", user).run(pool);
};

/*
 * Retrieve all users
 */
export const all = async (pool: pg.Pool): Promise<User[]> => {
  return await db.select("users", db.all).run(pool);
};

/*
 * Retrieve a user by ID.
 */
export const getById = async (pool: pg.Pool, id: string): Promise<User | null> => {
  return (await db.selectOne("users", { id }).run(pool)) ?? null;
};

/*
 * Search for users
 */
export const search = async (pool: pg.Pool, q: string): Promise<User[]> => {
  const users = await db.sql<s.users.SQL, s.users.Selectable[]>`
    SELECT *
    FROM ${"users"}
    WHERE to_tsvector(email || ' ' || coalesce(name, '')) @@ plainto_tsquery(${db.param(q)})
  `.run(pool);

  return users;
};
