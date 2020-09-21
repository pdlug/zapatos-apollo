import pg from "pg";

import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";

import { Item } from "../core";

const rowToItem = (item: s.items.Selectable): Item => ({
  id: item.id,
  title: item.title,
  description: item.description,
  content: item.content,
  keywords: item.keywords ? item.keywords : [],
});

type CreateItemProps = Pick<Item, "title" | "description" | "content" | "keywords">;

/*
 * Create a new item, returns the newly created item
 */
export const create = async (
  pool: pg.Pool,
  { title, description, content, keywords }: CreateItemProps
): Promise<Item> => {
  const item: s.items.Insertable = {
    title,
    description,
    content,
    keywords,
  };

  const [insertedItem] = await db.sql<s.items.SQL, s.items.Selectable[]>`
    INSERT INTO ${"items"} (${db.cols(item)})
    VALUES (${db.vals(item)}) RETURNING *
  `.run(pool);

  return rowToItem(insertedItem);
};

/*
 * Retrieve all items
 */
export const all = async (pool: pg.Pool): Promise<Item[]> => {
  const items = await db.sql<s.items.SQL, s.items.Selectable[]>`
    SELECT * FROM ${"items"}
  `.run(pool);

  return items.map(rowToItem);
};

/*
 * Retrieve an item by its ID.
 */
export const getById = async (pool: pg.Pool, id: string): Promise<Item | null> => {
  const [item] = await db.sql<s.items.SQL, s.items.Selectable[]>`
    SELECT * FROM ${"items"} WHERE ${"id"} = ${db.vals({ id })} LIMIT 1
  `.run(pool);

  return item ? rowToItem(item) : null;
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
