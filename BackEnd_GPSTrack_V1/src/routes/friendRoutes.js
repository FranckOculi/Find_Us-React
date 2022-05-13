import {
  getAllFriends,
  getFriendsEvent,
  addFriend,
} from '../controllers/friendController.js';
import {
  getAllFriendsSchema,
  getFriendsEventSchema,
  addFriendSchema,
} from '../schemas/friendSchema.js';
import { tokenVerification } from '../middleware/authMiddleware.js';

async function friendRoutes(fastify, options, done) {
  fastify.route({
    method: 'GET',
    url: '/:id/friends',
    schema: getAllFriendsSchema,
    preHandler: tokenVerification,
    handler: getAllFriends,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/:codeEvent/friends',
    schema: getFriendsEventSchema,
    preHandler: tokenVerification,
    handler: getFriendsEvent,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/:friendId/add',
    schema: addFriendSchema,
    preHandler: tokenVerification,
    handler: addFriend,
  });
}

export default friendRoutes;
