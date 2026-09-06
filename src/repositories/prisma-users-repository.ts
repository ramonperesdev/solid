import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface FindByEmailOrCpfParams {
  email: string
  cpf: string
}

export class PrismaUsersRepository {
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
}
