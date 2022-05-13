import {
  addEvent,
  getAllEvents,
  deleteGroup,
  updateEvent,
  addInvitation,
  getInvitation,
  getAllInvitations,
  getAllGroups,
  addGroup,
  updateGroup,
  addMember,
  getMembers,
  getAllMembers,
} from '../controllers/eventController.js';
import {
  getEventsSchema,
  addEventSchema,
  deleteEventSchema,
  updateEventSchema,
  getGroupsSchema,
} from '../schemas/eventSchema.js';
import { tokenVerification } from '../middleware/authMiddleware.js';

async function eventRoutes(fastify, options, done) {
  fastify.route({
    method: 'POST',
    url: '/:id/groups',
    schema: getGroupsSchema,
    preHandler: tokenVerification,
    handler: getAllGroups,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/:codeGroup/members',
    // schema: getGroupsSchema,
    // preHandler: tokenVerification,
    handler: getMembers,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/group',
    // schema: addEventSchema,
    preHandler: tokenVerification,
    handler: addGroup,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/members',
    // schema: addEventSchema,
    // preHandler: tokenVerification,
    handler: getAllMembers,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id/:codeGroup/delete',
    // schema: deleteEventSchema,
    // preHandler: tokenVerification,
    handler: deleteGroup,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id/:codeGroup/update',
    // schema: addEventSchema,
    // preHandler: tokenVerification,
    handler: updateGroup,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/:codeGroup/member',
    // schema: addEventSchema,
    preHandler: tokenVerification,
    handler: addMember,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/event',
    schema: addEventSchema,
    preHandler: tokenVerification,
    handler: addEvent,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/events',
    schema: getEventsSchema,
    preHandler: tokenVerification,
    handler: getAllEvents,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id/:codeEvent/:friendId/update',
    schema: updateEventSchema,
    preHandler: tokenVerification,
    handler: updateEvent,
  });

  fastify.route({
    method: 'POST',
    url: '/:codeEvent/invitation',
    // schema: updateEventSchema,
    // preHandler: tokenVerification,
    handler: addInvitation,
  });

  fastify.route({
    method: 'GET',
    url: '/:codeEvent/invitation',
    // schema: updateEventSchema,
    // preHandler: tokenVerification,
    handler: getInvitation,
  });

  fastify.route({
    method: 'GET',
    url: '/:id/invitations',
    // schema: updateEventSchema,
    // preHandler: tokenVerification,
    handler: getAllInvitations,
  });
}
export default eventRoutes;
