import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type {
  FindByEmailOrCpfParams,
  UsersRepository,
} from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmailOrCpf({ email, cpf }: FindByEmailOrCpfParams) {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf: cpf ? cpf : '' }],
      },
    })

    return userExists
  }

  async findAll() {
    const users = await prisma.user.findMany()

    return users
  }

  async findUnique(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    return user
  }
}
