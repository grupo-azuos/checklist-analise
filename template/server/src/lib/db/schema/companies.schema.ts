import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const companies = sqliteTable(
  'companies',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    cnpj: text('cnpj').notNull().unique(),
    obs: text('obs'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(sql`(cast(unixepoch('subsec') * 1000 as integer))`),
    createdBy: text('created_by').notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
    updatedBy: text('updated_by'),
  },
  table => [
    index('companies_name_idx').on(table.name),
  ],
);

export type CompanyRow = typeof companies.$inferSelect;
export type CompanyInsert = typeof companies.$inferInsert;
