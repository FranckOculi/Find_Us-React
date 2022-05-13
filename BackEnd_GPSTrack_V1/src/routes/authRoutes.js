import { addUserSchema, loginUserSchema } from '../schemas/authSchema.js';
import { signUp, login, requireAuth } from '../controllers/authController.js';

async function authRoutes(fastify, options, done) {
  fastify.route({
    method: 'GET',
    url: '/jwtid',
    handler: requireAuth,
  });

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: addUserSchema,
    handler: signUp,
  });

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginUserSchema,
    handler: login,
  });
}
export default authRoutes;
