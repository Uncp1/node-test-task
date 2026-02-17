import { Request, Response, NextFunction } from 'express';
import z from 'zod';

type ValidationSource = 'body' | 'params' | 'query';

export const validate = (schema: z.ZodType, source: ValidationSource = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      res.status(400).json({ error: 'Validation failed', details: errors });
      return;
    }

    if (source === 'body') {
      req.body = result.data;
    }

    next();
  };
};
