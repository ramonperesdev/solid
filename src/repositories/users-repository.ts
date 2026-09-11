import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmailOrCpf(data: FindByEmailOrCpfParams): Promise<User | null>
  findAll(): Promise<User[]>
  findUnique(id: string): Promise<User | null>
}

export interface FindByEmailOrCpfParams {
  email: string
  cpf: string
}
