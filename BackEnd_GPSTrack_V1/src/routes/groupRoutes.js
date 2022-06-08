import {
  // updateEvent,
  // addInvitation,
  // getInvitation,
  // getAllInvitations,
  getAllGroups,
  addGroup,
  deleteGroup,
  updateGroup,
  addMember,
  getMembers,
  getAllMembers,
} from '../controllers/groupController.js';
import {
  addGroupSchema,
  deleteGroupSchema,
  updateGroupSchema,
  getGroupsSchema,
  addMemberSchema,
} from '../schemas/groupSchema.js';
import { tokenVerification } from '../middleware/authMiddleware.js';

async function groupRoutes(fastify, options, done) {
  /* groups */
  fastify.route({
    method: 'GET',
    url: '/:id/:codeGroup/groups',
    schema: getGroupsSchema,
    preHandler: tokenVerification,
    handler: getAllGroups,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/group',
    schema: addGroupSchema,
    preHandler: tokenVerification,
    handler: addGroup,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id/:codeGroup/delete',
    schema: deleteGroupSchema,
    preHandler: tokenVerification,
    handler: deleteGroup,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id/:codeGroup/update',
    // schema: editGroupSchema,
    preHandler: tokenVerification,
    handler: updateGroup,
  });

  /* members */
  fastify.route({
    method: 'GET',
    url: '/:id/:codeGroup/members',
    schema: getGroupsSchema,
    preHandler: tokenVerification,
    handler: getMembers,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/:codeGroup/member',
    schema: addMemberSchema,
    preHandler: tokenVerification,
    handler: addMember,
  });

  // fastify.route({
  //   method: 'POST',
  //   url: '/:codeEvent/invitation',
  //   // schema: updateEventSchema,
  //   // preHandler: tokenVerification,
  //   handler: addInvitation,
  // });

  // fastify.route({
  //   method: 'GET',
  //   url: '/:codeEvent/invitation',
  //   // schema: updateEventSchema,
  //   // preHandler: tokenVerification,
  //   handler: getInvitation,
  // });

  // fastify.route({
  //   method: 'GET',
  //   url: '/:id/invitations',
  //   // schema: updateEventSchema,
  //   // preHandler: tokenVerification,
  //   handler: getAllInvitations,
  // });
}
export default groupRoutes;
