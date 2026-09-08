import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUserUseCase } from '../../use-cases/register-user-use-case'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'

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
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    await registerUseCase.execute({ name, email, cpf, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
