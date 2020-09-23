/* eslint-disable camelcase */
import pg from "pg";

import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";

import { Item } from "../core";

/*
 * Convert a date to an ISO 8601 string in YYYY-MM-DD format.
 */
const dateToISO = (d: Date): string => d.toISOString().substring(0, 10);

/*
 * Convert an item row to an item type setting any default values required.
 */
const rowToItem = (item: s.items.Selectable | s.items.JSONSelectable): Item => ({
  ...item,
  keywords: item.keywords ? item.keywords : [],
  publishedOn: typeof item.published_on === "string" ? item.published_on : dateToISO(item.published_on),
});

type CreateItemProps = Pick<Item, "title" | "description" | "content" | "keywords" | "publishedOn">;

/*
 * Create a new item, returns the newly created item
 */
export const create = async (pool: pg.Pool, item: CreateItemProps): Promise<Item> => {
  const { publishedOn: published_on, ...rest } = item;

  const insertedItem = await db
    .insert("items", {
      ...rest,
      ...(published_on && { published_on }),
    })
    .run(pool);

  return rowToItem(insertedItem);
};

/*
 * Retrieve all items
 */
export const all = async (pool: pg.Pool): Promise<Item[]> => {
  const items = await db.select("items", db.all).run(pool);

  return items.map(rowToItem);
};

/*
 * Retrieve an item by its ID.
 */
export const getById = async (pool: pg.Pool, id: string): Promise<Item | null> => {
  const item = await db.selectOne("items", { id }).run(pool);
  return item ? rowToItem(item) : null;
};

type UpdateItemProps = Partial<Pick<Item, "title" | "description" | "content" | "keywords" | "publishedOn">>;

/*
 * Update an item given its ID.
 */
export const update = async (pool: pg.Pool, id: string, fields: UpdateItemProps): Promise<Item | null> => {
  const { publishedOn: published_on, ...rest } = fields;

  const [item] = await db
    .update(
      "items",
      {
        ...rest,
        ...(published_on && { published_on }),
      },
      { id }
    )
    .run(pool);

  return item ? getById(pool, id) : null;
};

/*
 * Delete an item by its ID.
 */
export const deleteById = async (pool: pg.Pool, id: string): Promise<boolean> => {
  const deletedItems = await db.deletes("items", { id }).run(pool);

  return deletedItems.length > 0;
};

/*
 * Search for items
 */
export const search = async (pool: pg.Pool, q: string): Promise<Item[]> => {
  const items = await db.sql<s.items.SQL, s.items.Selectable[]>`
    SELECT *
    FROM ${"items"}
    WHERE searchable_index @@ plainto_tsquery(${db.param(q)})
  `.run(pool);

  return items.map(rowToItem);
};
