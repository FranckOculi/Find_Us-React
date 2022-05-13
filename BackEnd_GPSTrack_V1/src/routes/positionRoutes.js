import {
  addPosition,
  getPositions,
  getLastPosition,
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
    url: '/:id/:codeEvent/positions',
    schema: getPositionSchema,
    preHandler: tokenVerification,
    handler: getPositions,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/:codeEvent/lastposition',
    schema: getPositionSchema,
    preHandler: tokenVerification,
    handler: getLastPosition,
  });
}
export default positionRoutes;
