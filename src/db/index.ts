//  import { drizzle } from 'drizzle-orm/mysql2';
// import mysql from 'mysql2/promise';
// import * as schema from './schema';

// const poolConnection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: Number(process.env.DB_PORT)
// });

// export const db = drizzle(poolConnection, { schema, mode: 'default' });

import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
// You can specify any property from the mysql2 connection options
export const db = drizzle({ connection: { uri: process.env.NEXT_PUBLIC_DATABASE_URL }});
