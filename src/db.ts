import { Pool } from "pg";

const pool = new Pool({
  user: "blah",
  host: "need.a.new.one",
  database: "blah",
  password: "secret",
  port: 5432,
});

export const query = (text: string, params: any[]) => pool.query(text, params);
