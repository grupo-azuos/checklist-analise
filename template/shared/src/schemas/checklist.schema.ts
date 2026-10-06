import { z } from 'zod';
import { paginationQuerySchema } from './pagination.schema';

const checklistStatusEnum = ['nao-iniciado', 'em-andamento', 'concluido'] as const;

export const checklistTaskSchema = z.object({
  id: z.number().int(),
  checklistId: z.number().int(),
  etapaIdx: z.number().int(),
  text: z.string(),
  completed: z.boolean(),
  observation: z.string().nullable(),
  completedAt: z.string().datetime().nullable(),
});

export const checklistSchema = z.object({
  id: z.number().int(),
  companyId: z.number().int(),
  companyName: z.string(),
  companyCnpj: z.string(),
  period: z.string(), // YYYY-MM
  responsible: z.string(),
  deadline: z.string(), // YYYY-MM-DD
  obs: z.string().nullable(),
  status: z.enum(checklistStatusEnum),
  progress: z.number().int(), // percentual 0-100
  createdAt: z.string().datetime(),
  createdBy: z.string(),
  updatedAt: z.string().datetime(),
  updatedBy: z.string(),
  tasks: z.array(checklistTaskSchema),
});

export const createChecklistSchema = z.object({
  companyId: z.number({ required_error: 'Empresa obrigatória' }).int().positive(),
  period: z
    .string({ required_error: 'Período obrigatório' })
    .regex(/^\d{4}-\d{2}$/, 'Período em formato YYYY-MM'),
  responsible: z
    .string({ required_error: 'Responsável obrigatório' })
    .min(1, 'Responsável obrigatório')
    .max(100, 'Até 100 caracteres'),
  deadline: z
    .string({ required_error: 'Prazo obrigatório' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data em formato YYYY-MM-DD'),
  obs: z.string().nullable().optional(),
});

export const updateChecklistSchema = createChecklistSchema.partial();

export const checklistFormSchema = z.object({
  companyId: z.string({ required_error: 'Empresa obrigatória' }).min(1, 'Empresa obrigatória'),
  period: z
    .string({ required_error: 'Período obrigatório' })
    .regex(/^\d{4}-\d{2}$/, 'Período em formato YYYY-MM'),
  responsible: z
    .string({ required_error: 'Responsável obrigatório' })
    .min(1, 'Responsável obrigatório')
    .max(100, 'Até 100 caracteres'),
  deadline: z
    .string({ required_error: 'Prazo obrigatório' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data em formato YYYY-MM-DD'),
  obs: z.string().default(''),
});

export const updateChecklistTaskSchema = z.object({
  completed: z.boolean().optional(),
  observation: z.string().nullable().optional(),
});

export const checklistListQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  responsible: z.string().optional(),
  status: z.enum(checklistStatusEnum).optional(),
});

export type ChecklistTask = z.infer<typeof checklistTaskSchema>;
export type Checklist = z.infer<typeof checklistSchema>;
export type CreateChecklistInput = z.infer<typeof createChecklistSchema>;
export type UpdateChecklistInput = z.infer<typeof updateChecklistSchema>;
export type ChecklistFormData = z.infer<typeof checklistFormSchema>;
export type UpdateChecklistTaskInput = z.infer<typeof updateChecklistTaskSchema>;
export type ChecklistListQuery = z.infer<typeof checklistListQuerySchema>;
