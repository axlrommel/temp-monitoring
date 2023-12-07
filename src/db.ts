import { Pool } from "pg";

const pool = new Pool({
  user: "bytevlsm",
  host: "lallah.db.elephantsql.com",
  database: "bytevlsm",
  password: "sStCaVzDLcap-ar-Fg2S4CErmfufb843",
  port: 5432,
});

export const query = (text: string, params: any[]) => pool.query(text, params);
