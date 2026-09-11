import type { User } from '@prisma/client'
import type { UsersRepository } from '../repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'

interface GetUseCaseRequest {
  id?: string | undefined
}

interface GetUserUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUseCaseRequest): Promise<GetUserUseCaseResponse> {
    if (!id) {
      throw new Error()
    }

    const user = await this.usersRepository.findUnique(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    return { user }
  }
}
