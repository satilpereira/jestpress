import z from 'zod';

export const HelloBodySchema = z.object({
  name: z.string().nonempty(),
});

export const HelloParamsSchema = z.object({
  id: z.string().nonempty(),
});
