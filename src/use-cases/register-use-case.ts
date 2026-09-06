import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  cpf,
  password,
}: RegisterUseCaseRequest) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const password_hash = await hash(password, 6)

  const userExists = await prismaUsersRepository.findByEmailOrCpf({
    email,
    cpf,
  })

  if (userExists) {
    throw new Error('Duplicated data.')
  }

  await prismaUsersRepository.create({
    name,
    email,
    cpf,
    password_hash,
  })
}
