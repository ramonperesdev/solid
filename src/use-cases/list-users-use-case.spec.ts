import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { ListUsersUseCase } from './list-users-use-case'

describe('List Users Use Case', () => {
  it('should be return users', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new ListUsersUseCase(usersRepository)

    const { users } = await getUserUseCase.execute()

    expect(users).toHaveLength(2)
  })

  it('should be able to list users after create', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const listUsersUseCase = new ListUsersUseCase(usersRepository)

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
