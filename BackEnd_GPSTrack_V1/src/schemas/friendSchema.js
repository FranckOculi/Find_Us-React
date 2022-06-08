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

const paramsJsonSchemaGet = {
  type: 'object',
  required: ['id', 'friendsId'],
  properties: {
    id: { type: 'number' },
    friendsId: { type: 'string' },
  },
};

export const getAllFriendsSchema = {
  params: paramsJsonSchemaAll,
};

export const addFriendSchema = fastJson({
  params: paramsJsonSchemaAdd,
});

export const getFriendsSchema = {
  params: paramsJsonSchemaGet,
};
