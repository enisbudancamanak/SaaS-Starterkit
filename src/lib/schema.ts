import { z } from 'zod'

export const newUserSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email address' }),
  password: z
    .string()
    .min(2, 'Password should have at least 6 characters')
    .max(20, 'Password should be no longer than 32 characters'),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const enterCodeSchema = z.object({
  code: z.string().length(6),
})

export type FormSchema = typeof newUserSchema
