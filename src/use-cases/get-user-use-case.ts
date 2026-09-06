import type { UsersRepository } from '../repositories/users-repository'

interface GetUseCaseRequest {
  id?: string | undefined
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUseCaseRequest) {
    if (!id) {
      const users = await this.usersRepository.findAll()

      return users
    }

    const user = await this.usersRepository.findUnique(id)

    return user
  }
}
