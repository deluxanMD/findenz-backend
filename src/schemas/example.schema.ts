import { z } from 'zod'

export const exampleSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

type Example = z.infer<typeof exampleSchema>

export type { Example }
