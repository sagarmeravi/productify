import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
  throw new Error("DB_URL Not setup!");
}

const pool = new Pool({ connectionString: ENV.DATABASE_URL });

pool.on("connect", () => {
  console.log("Database connected succesfully!");
});

pool.on("error", () => {
  console.log("Couldnt't connect the database!");
});

export const db = drizzle({ client: pool, schema });
