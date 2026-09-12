import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUserUseCase } from './register-user-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerUserUseCase: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUserUseCase = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUserUseCase.execute({
      name: 'Lucas Nobre',
      email: 'lucasteste@gmail.com',
      cpf: '11111111111',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUserUseCase.execute({
      name: 'Lucas Nobre',
      email: 'lucasteste@gmail.com',
      cpf: '11111111111',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email of cpf twice', async () => {
    const data = { email: 'lucasteste@gmail.com', cpf: '12345678912' }

    await registerUserUseCase.execute({
      name: 'Lucas Nobre',
      email: data.email,
      cpf: data.cpf,
      password: '123456',
    })

    await expect(() =>
      registerUserUseCase.execute({
        name: 'Lucas Nobre',
        email: data.email,
        cpf: data.cpf,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
