import pg from "pg";

export const connect = async ({ url }: { url: string }): Promise<pg.Pool> => new pg.Pool({ connectionString: url });

export * as Items from "./Items";
export * as Users from "./Users";
