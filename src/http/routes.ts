import type { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user-controller'
import { getUserController } from './controllers/get-user-controller'
import { listUsersController } from './controllers/list-users-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.get('/users', listUsersController)
  app.get('/users/:id', getUserController)
}
