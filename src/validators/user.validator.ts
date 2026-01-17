import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password is too long')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain digit');

export const registerSchema = z.object({
  fullName: z.string().min(2),
  birthDate: z.string(),
  email: z.email(),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
