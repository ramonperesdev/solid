import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate-use-case'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const passwordHash = await hash('123456', 6)

    await usersRepository.create({
      name: 'Lucas Nobre',
      email: 'lucasteste@gmail.com',
      cpf: '11111111111',
      password_hash: passwordHash,
    })

    const { user } = await authenticateUseCase.execute({
      email: 'lucasteste@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'bperes@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const passwordHash = await hash('123456', 6)

    await usersRepository.create({
      name: 'Lucas Nobre',
      email: 'lucasteste@gmail.com',
      cpf: '11111111111',
      password_hash: passwordHash,
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'lucasteste@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
