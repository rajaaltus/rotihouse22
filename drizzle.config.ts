//  import type { Config } from 'drizzle-kit';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '.env.local' });
import 'dotenv/config';
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
}) 
