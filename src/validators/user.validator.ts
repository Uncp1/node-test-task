import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password is too long')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain digit');

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name is too long'),
  birthDate: z
    .date('Invalid date format, expected YYYY-MM-DD')
    .refine((val) => new Date(val) <= new Date(), 'Birth date cannot be in the future'),
  email: z.email('Invalid email format'),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const idParamSchema = z.object({
  id: z.uuid('Invalid ID format'),
});
