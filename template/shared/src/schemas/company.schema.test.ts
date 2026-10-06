import { describe, it, expect } from 'vitest';
import { createCompanySchema, companyFormSchema } from './company.schema';

describe('Company Schema', () => {
  describe('feliz', () => {
    it('deve validar uma empresa com dados válidos', () => {
      const input = {
        name: 'Empresa LTDA',
        cnpj: '12.345.678/0001-90',
        obs: 'Observações',
      };
      expect(createCompanySchema.parse(input)).toEqual(input);
    });

    it('deve aceitar obs como null', () => {
      const input = {
        name: 'Empresa LTDA',
        cnpj: '12.345.678/0001-90',
        obs: null,
      };
      expect(createCompanySchema.parse(input)).toEqual(input);
    });
  });

  describe('triste', () => {
    it('deve rejeitar sem nome', () => {
      const input = {
        name: '',
        cnpj: '12.345.678/0001-90',
      };
      expect(() => createCompanySchema.parse(input)).toThrow('Nome obrigatório');
    });

    it('deve rejeitar nome > 150 chars', () => {
      const input = {
        name: 'A'.repeat(151),
        cnpj: '12.345.678/0001-90',
      };
      expect(() => createCompanySchema.parse(input)).toThrow();
    });

    it('deve rejeitar CNPJ inválido', () => {
      const input = {
        name: 'Empresa LTDA',
        cnpj: '12345678000190',
      };
      expect(() => createCompanySchema.parse(input)).toThrow();
    });

    it('deve rejeitar sem CNPJ', () => {
      const input = {
        name: 'Empresa LTDA',
      };
      expect(() => createCompanySchema.parse(input)).toThrow('CNPJ obrigatório');
    });
  });

  describe('Form Schema', () => {
    it('deve validar form com dados válidos', () => {
      const input = {
        name: 'Empresa LTDA',
        cnpj: '12.345.678/0001-90',
        obs: 'Observações',
      };
      expect(companyFormSchema.parse(input)).toEqual(input);
    });

    it('deve converter obs vazio em string vazia', () => {
      const input = {
        name: 'Empresa LTDA',
        cnpj: '12.345.678/0001-90',
      };
      const result = companyFormSchema.parse(input);
      expect(result.obs).toBe('');
    });
  });
});
