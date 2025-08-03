import { z } from 'zod';

export const updateTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  description: z.string().min(1, "La descripción es obligatoria").optional(),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  due_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Formato de hora inválido (HH:MM o HH:MM:SS)'),
  photo: z.string().url().optional(),
  assigned_to: z.number().int().positive(),
  assigned_by: z.number().int().positive()
});


export const createTaskSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  due_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Formato de hora inválido (HH:MM o HH:MM:SS)'),
  photo: z.string().optional(),
  assigned_to: z.number().int(),
  assigned_by: z.number().int(),
});
