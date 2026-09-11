import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../../use-cases/get-user-use-case'
import z from 'zod'
import { UserNotExistsError } from '../../use-cases/errors/user-not-exists-error'

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUsersSchema = z.object({
    id: z.string().uuid().optional(),
  })

  const { id } = getUsersSchema.parse(request.params)

  try {
    const usersRepository = new PrismaUsersRepository()
    const getUseCase = new GetUserUseCase(usersRepository)

    const users = await getUseCase.execute({ id })

    return reply.status(200).send(users)
  } catch (error) {
    if (error instanceof UserNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }
    return reply.status(400).send()
  }
}
