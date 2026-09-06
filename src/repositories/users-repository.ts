import type { Prisma, User } from '@prisma/client'
import type { FindByEmailOrCpfParams } from './prisma/prisma-users-repository'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmailOrCpf(data: FindByEmailOrCpfParams): Promise<User | null>
  findAll(): Promise<User[]>
  findUnique(id: string): Promise<User | null>
}
