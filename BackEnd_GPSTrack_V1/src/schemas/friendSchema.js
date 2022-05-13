import fastJson from 'fast-json-stringify';

const paramsJsonSchemaAll = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};
const paramsJsonSchemaEvent = {
  type: 'object',
  required: ['id', 'codeEvent'],
  properties: {
    id: { type: 'number' },
    codeEvent: { type: 'string', minLength: 8, maxLength: 8 },
  },
};

const paramsJsonSchemaAdd = {
  type: 'object',
  required: ['id', 'friendId'],
  properties: {
    id: { type: 'number' },
    friendId: { type: 'number' },
  },
};

export const getAllFriendsSchema = {
  params: paramsJsonSchemaAll,
};

export const getFriendsEventSchema = {
  params: paramsJsonSchemaEvent,
};

export const addFriendSchema = fastJson({
  params: paramsJsonSchemaAdd,
});
