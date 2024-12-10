import { mysqlTable, serial, varchar, longtext, bigint, boolean, int, timestamp } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';


export const dishes = mysqlTable('dishes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  description: longtext('description'),
  price: bigint('price', { mode: 'number' }),
  active: boolean('active'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  category: int('category'),
  featured: boolean('featured'),
  type: varchar('type', { length: 255 })
});

export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  type: varchar('type', { length: 255 })
});

export const uploadFile = mysqlTable('upload_file', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  hash: varchar('hash', { length: 255 }).notNull(),
  sha256: varchar('sha256', { length: 255 }),
  ext: varchar('ext', { length: 255 }),
  mime: varchar('mime', { length: 255 }).notNull(),
  size: varchar('size', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerMetadata: longtext('provider_metadata'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

export const uploadFileMorph = mysqlTable('upload_file_morph', {
  id: serial('id').primaryKey(),
  uploadFileId: int('upload_file_id'),
  relatedId: int('related_id'),
  relatedType: longtext('related_type'),
  field: longtext('field')
});

export const dishesRelations = relations(dishes, ({ one }: { one: any }) => ({
  category: one(categories, {
    fields: [dishes.category],
    references: [categories.id],
  }),
}));