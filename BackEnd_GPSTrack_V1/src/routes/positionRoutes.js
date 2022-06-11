import {
  addPosition,
  getLastPosition,
  getGroupsLastPositions,
} from '../controllers/positionController.js';
import {
  addPositionSchema,
  getPositionSchema,
  getPositionsSchema,
} from '../schemas/positionSchema.js';
import { tokenVerification } from '../middleware/authMiddleware.js';

async function positionRoutes(fastify, options, done) {
  fastify.route({
    method: 'POST',
    url: '/:id/position',
    schema: addPositionSchema,
    preHandler: tokenVerification,
    handler: addPosition,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/lastposition',
    schema: getPositionSchema,
    preHandler: tokenVerification,
    handler: getLastPosition,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/:codeGroup/lastpositions',
    schema: getPositionsSchema,
    preHandler: tokenVerification,
    handler: getGroupsLastPositions,
  });
}
export default positionRoutes;
