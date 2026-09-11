import type { Prisma, User } from '@prisma/client'
import type {
  FindByEmailOrCpfParams,
  UsersRepository,
} from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = [
    {
      id: 'user-test',
      name: 'User Test',
      email: 'usertest@email.com',
      cpf: '01010101011',
      password_hash: '1231235',
      created_at: new Date(),
    },
    {
      id: 'user-test2',
      name: 'User Test2',
      email: 'usertest2@email.com',
      cpf: '01010101022',
      password_hash: '1231235',
      created_at: new Date(),
    },
  ]

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: `user-1-${data.cpf}`,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmailOrCpf({ email, cpf }: FindByEmailOrCpfParams) {
    const userExists = this.items.find(
      (i) => i.email === email || i.cpf === cpf,
    )

    if (!userExists) {
      return null
    }

    return userExists
  }

  async findAll() {
    return this.items
  }

  async findUnique(id: string): Promise<User | null> {
    const user = this.items.find((i) => i.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
