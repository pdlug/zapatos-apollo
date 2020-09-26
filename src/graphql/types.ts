import pg from "pg";

export type Context = {
  db: pg.Pool;
};
