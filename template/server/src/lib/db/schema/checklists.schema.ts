import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { companies } from './companies.schema';

export const checklists = sqliteTable(
  'checklists',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    companyId: integer('company_id')
      .notNull()
      .references(() => companies.id, { onDelete: 'cascade' }),
    period: text('period').notNull(), // YYYY-MM
    responsible: text('responsible').notNull(),
    deadline: text('deadline').notNull(), // YYYY-MM-DD
    obs: text('obs'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(sql`(cast(unixepoch('subsec') * 1000 as integer))`),
    createdBy: text('created_by').notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
    updatedBy: text('updated_by'),
  },
  table => [
    index('checklists_company_idx').on(table.companyId),
    index('checklists_period_idx').on(table.period),
  ],
);

export const checklistTasks = sqliteTable(
  'checklist_tasks',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    checklistId: integer('checklist_id')
      .notNull()
      .references(() => checklists.id, { onDelete: 'cascade' }),
    etapaIdx: integer('etapa_idx').notNull(), // índice da etapa (0-5)
    text: text('text').notNull(),
    completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
    observation: text('observation'),
    completedAt: integer('completed_at', { mode: 'timestamp_ms' }),
  },
  table => [
    index('checklist_tasks_checklist_idx').on(table.checklistId),
  ],
);

export type ChecklistRow = typeof checklists.$inferSelect;
export type ChecklistInsert = typeof checklists.$inferInsert;
export type ChecklistTaskRow = typeof checklistTasks.$inferSelect;
export type ChecklistTaskInsert = typeof checklistTasks.$inferInsert;
