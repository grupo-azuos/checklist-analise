import { z } from 'zod';
import { paginationQuerySchema } from './pagination.schema';

export const companySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  cnpj: z.string(),
  obs: z.string().nullable(),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
  updatedAt: z.string().datetime(),
  updatedBy: z.string(),
});

export const createCompanySchema = z.object({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .min(1, 'Nome obrigatório')
    .max(150, 'Até 150 caracteres'),
  cnpj: z
    .string({ required_error: 'CNPJ obrigatório' })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ em formato inválido'),
  obs: z.string().nullable().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();

export const companyFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .min(1, 'Nome obrigatório')
    .max(150, 'Até 150 caracteres'),
  cnpj: z
    .string({ required_error: 'CNPJ obrigatório' })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ em formato inválido'),
  obs: z.string().default(''),
});

export const companyListQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
});

export type Company = z.infer<typeof companySchema>;
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type CompanyFormData = z.infer<typeof companyFormSchema>;
export type CompanyListQuery = z.infer<typeof companyListQuerySchema>;
