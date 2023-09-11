import { z } from 'zod'

export const newUserSchema = z.object({
  email: z.string().email({ message: 'E-Mail must be a valid email address' }),
  password: z
    .string()
    .min(6, 'Password should have at least 6 characters')
    .max(32, 'Password should be no longer than 32 characters'),
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'E-Mail must be a valid email address' }),
  password: z.string().min(2, 'Please type your password'),
})

export const enterCodeSchema = z.object({
  code: z.string().length(6),
})

export const enterEmailSchema = z.object({
  email: z.string().email({ message: 'E-Mail must be a valid email address' }),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password should have at least 6 characters')
      .max(32, 'Password should be no longer than 32 characters'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type FormSchema = typeof newUserSchema
export type EnterEmailSchema = typeof enterEmailSchema
export type ResetPasswordSchema = typeof resetPasswordSchema
