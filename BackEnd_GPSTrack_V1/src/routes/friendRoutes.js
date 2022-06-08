import {
  getAllFriends,
  addFriend,
  getFriendsData,
} from '../controllers/friendController.js';
import {
  getAllFriendsSchema,
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
    method: 'POST',
    url: '/:id/:friendId/add',
    schema: addFriendSchema,
    preHandler: tokenVerification,
    handler: addFriend,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/friendsData',
    // schema: getFriendsSchema,
    // preHandler: tokenVerification,
    handler: getFriendsData,
  });
}

export default friendRoutes;
