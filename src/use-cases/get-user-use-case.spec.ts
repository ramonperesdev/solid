import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from './get-user-use-case'
import { UserNotExistsError } from './errors/user-not-exists-error'

let usersRepository: InMemoryUsersRepository
let getUserUseCase: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserUseCase = new GetUserUseCase(usersRepository)
  })

  it('should be return user', async () => {
    const { user } = await getUserUseCase.execute({ id: 'user-test' })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be return user with wrong id', async () => {
    await expect(
      getUserUseCase.execute({ id: 'user-test-reject' }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })

  it('should not be return user without id', async () => {
    await expect(getUserUseCase.execute({})).rejects.toBeInstanceOf(Error)
  })
})
