import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '../../use-cases/list-users-use-case'

export async function listUsersController(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const usersRepository = new PrismaUsersRepository()
    const listUsersUseCase = new ListUsersUseCase(usersRepository)

    const users = await listUsersUseCase.execute()

    return reply.status(200).send(users)
  } catch (error) {
    return reply.status(409).send()
  }
}
