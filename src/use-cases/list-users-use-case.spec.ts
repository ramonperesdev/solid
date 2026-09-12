import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { ListUsersUseCase } from './list-users-use-case'

let usersRepository: InMemoryUsersRepository
let listUsersUseCase: ListUsersUseCase

describe('List Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    listUsersUseCase = new ListUsersUseCase(usersRepository)
  })

  it('should be return users', async () => {
    const { users } = await listUsersUseCase.execute()

    expect(users).toHaveLength(2)
  })

  it('should be able to list users after create', async () => {
    await usersRepository.create({
      name: 'User 1',
      email: 'user1@email.com',
      cpf: '11111111111',
      password_hash: '123456',
    })

    await usersRepository.create({
      name: 'User 2',
      email: 'user2@email.com',
      cpf: '22222222222',
      password_hash: '123456',
    })

    const { users } = await listUsersUseCase.execute()

    expect(users).toHaveLength(4)
    expect(users[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        email: expect.any(String),
      }),
    )
  })
})
