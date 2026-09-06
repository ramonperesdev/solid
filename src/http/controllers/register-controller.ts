import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCase } from '../../use-cases/register-use-case'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().min(11),
    password: z.string().min(6),
  })

  const { name, email, cpf, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({ name, email, cpf, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
