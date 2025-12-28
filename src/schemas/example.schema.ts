import { z } from 'zod'

export const exampleSchema = z.object({
  id: z.string(),
})

type Example = z.infer<typeof exampleSchema>

export type { Example }
