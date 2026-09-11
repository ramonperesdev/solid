import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from './get-user-use-case'
import { UserNotExistsError } from './errors/user-not-exists-error'

describe('Get User Use Case', () => {
  it('should be return user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const { user } = await getUserUseCase.execute({ id: 'user-test' })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be return user with wrong id', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    await expect(
      getUserUseCase.execute({ id: 'user-test-reject' }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should not be return user without id', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    await expect(getUserUseCase.execute({})).rejects.toBeInstanceOf(Error)
  })
})
