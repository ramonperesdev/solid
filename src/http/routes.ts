import type { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user-controller'
import { getUserController } from './controllers/get-user-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.get('/users', getUserController)
  app.get('/users/:id', getUserController)
}
