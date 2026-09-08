import { hash } from 'bcryptjs'
import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, cpf, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmailOrCpf({
      email,
      cpf,
    })

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      cpf,
      password_hash,
    })
  }
}
