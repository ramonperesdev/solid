import { hash } from 'bcryptjs'
import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import type { User } from '@prisma/client'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    cpf,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmailOrCpf({
      email,
      cpf,
    })

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password_hash,
    })

    return {
      user,
    }
  }
}
