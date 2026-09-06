import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { UsersRepository } from '../users-repository'

export interface FindByEmailOrCpfParams {
  email: string
  cpf: string
}

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
        OR: [{ email }, { cpf }],
      },
    })

    return userExists
  }

  async findAll() {
    const user = await prisma.user.findMany()

    return user
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
