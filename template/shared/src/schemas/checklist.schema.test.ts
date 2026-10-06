import { describe, it, expect } from 'vitest';
import { createChecklistSchema, checklistFormSchema } from './checklist.schema';

describe('Checklist Schema', () => {
  describe('feliz', () => {
    it('deve validar um checklist com dados válidos', () => {
      const input = {
        companyId: 1,
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
        obs: 'Observações',
      };
      expect(createChecklistSchema.parse(input)).toEqual(input);
    });

    it('deve aceitar obs como null', () => {
      const input = {
        companyId: 1,
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
        obs: null,
      };
      expect(createChecklistSchema.parse(input)).toEqual(input);
    });
  });

  describe('triste', () => {
    it('deve rejeitar sem companyId', () => {
      const input = {
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
      };
      expect(() => createChecklistSchema.parse(input)).toThrow();
    });

    it('deve rejeitar companyId <= 0', () => {
      const input = {
        companyId: 0,
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
      };
      expect(() => createChecklistSchema.parse(input)).toThrow();
    });

    it('deve rejeitar período em formato inválido', () => {
      const input = {
        companyId: 1,
        period: '10/2024',
        responsible: 'João Silva',
        deadline: '2024-10-31',
      };
      expect(() => createChecklistSchema.parse(input)).toThrow();
    });

    it('deve rejeitar responsável vazio', () => {
      const input = {
        companyId: 1,
        period: '2024-10',
        responsible: '',
        deadline: '2024-10-31',
      };
      expect(() => createChecklistSchema.parse(input)).toThrow();
    });

    it('deve rejeitar responsável > 100 chars', () => {
      const input = {
        companyId: 1,
        period: '2024-10',
        responsible: 'A'.repeat(101),
        deadline: '2024-10-31',
      };
      expect(() => createChecklistSchema.parse(input)).toThrow();
    });

    it('deve rejeitar deadline em formato inválido', () => {
      const input = {
        companyId: 1,
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '31/10/2024',
      };
      expect(() => createChecklistSchema.parse(input)).toThrow();
    });
  });

  describe('Form Schema', () => {
    it('deve validar form com dados válidos', () => {
      const input = {
        companyId: '1',
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
        obs: 'Observações',
      };
      const result = checklistFormSchema.parse(input);
      expect(result.companyId).toBe('1');
      expect(result.obs).toBe('Observações');
    });

    it('deve converter obs vazio em string vazia', () => {
      const input = {
        companyId: '1',
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
      };
      const result = checklistFormSchema.parse(input);
      expect(result.obs).toBe('');
    });

    it('deve rejeitar companyId vazio', () => {
      const input = {
        companyId: '',
        period: '2024-10',
        responsible: 'João Silva',
        deadline: '2024-10-31',
      };
      expect(() => checklistFormSchema.parse(input)).toThrow();
    });
  });
});
