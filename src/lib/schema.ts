import { z } from 'zod'

export const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
