import {
  addPosition,
  getPositions,
  getLastPositions,
} from '../controllers/positionController.js';
import {
  addPositionSchema,
  getPositionSchema,
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
    url: '/:id/:codeGroup/positions',
    schema: getPositionSchema,
    preHandler: tokenVerification,
    handler: getPositions,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/:codeGroup/lastpositions',
    schema: getPositionSchema,
    preHandler: tokenVerification,
    handler: getLastPositions,
  });
}
export default positionRoutes;
