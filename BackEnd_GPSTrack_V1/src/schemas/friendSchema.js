import fastJson from 'fast-json-stringify';

const paramsJsonSchemaAll = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
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

export const addFriendSchema = fastJson({
  params: paramsJsonSchemaAdd,
});
