import {
  getUserInfo,
  deleteUser,
  updateUser,
  getShortUserInfo,
  getMe,
} from '../controllers/userController.js';
import {
  getUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from '../schemas/userSchema.js';
import { tokenVerification } from '../middleware/authMiddleware.js';

async function userRoutes(fastify, options, done) {
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getUserSchema,
    preHandler: tokenVerification,
    handler: getUserInfo,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/me',
    // schema: getUserSchema,
    // preHandler: tokenVerification,
    handler: getMe,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id/delete',
    schema: deleteUserSchema,
    preHandler: tokenVerification,
    handler: deleteUser,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id/update',
    schema: updateUserSchema,
    preHandler: tokenVerification,
    handler: updateUser,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/short',
    // schema: getUserSchema,
    preHandler: tokenVerification,
    handler: getShortUserInfo,
  });
}
export default userRoutes;
