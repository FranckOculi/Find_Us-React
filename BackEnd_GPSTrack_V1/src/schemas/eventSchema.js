import fastJson from 'fast-json-stringify';

const bodyJsonSchema = {
  type: 'object',
  required: ['nomEvenement', 'dateEvenement'],
  properties: {
    codeEvenement: { type: 'string' },
    nomEvenement: { type: 'string' },
    createur: { type: 'integer' },
    dateEvenement: { type: 'string', format: 'date-time' },
    dateFin: { type: 'string', format: 'date-time' },
    pseudoCreateur: { type: 'string' },
    membres: { type: 'string' },
  },
};

const paramsJsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

const paramsJsonSchemaDelete = {
  type: 'object',
  required: ['id', 'codeGroup'],
  properties: {
    id: { type: 'number' },
    codeGroup: { type: 'string', minLength: 8, maxLength: 8 },
  },
};

const paramsJsonSchemaAdd = {
  type: 'object',
  required: ['id', 'codeEvent', 'friendId'],
  properties: {
    id: { type: 'number' },
    codeEvent: { type: 'string', minLength: 8, maxLength: 8 },
    friendId: { type: 'string' },
  },
};

const bodyGroup = {
  type: 'array',
  group: { type: 'string' },
};

export const getGroupsSchema = {
  body: bodyGroup,
};

export const addEventSchema = fastJson({
  body: bodyJsonSchema,
  params: paramsJsonSchema,
});

export const getEventsSchema = {
  params: paramsJsonSchema,
};

export const deleteEventSchema = {
  params: paramsJsonSchemaDelete,
};

export const updateEventSchema = {
  params: paramsJsonSchemaAdd,
};
