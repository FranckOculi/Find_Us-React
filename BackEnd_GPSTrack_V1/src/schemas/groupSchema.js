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

const paramsJsonGroupsSchema = {
  type: 'object',
  required: ['id', 'codeGroup'],
  properties: {
    id: { type: 'number' },
    codeGroup: { type: 'string' },
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

const bodyGroup = {
  type: 'array',
  group: { type: 'string' },
};

export const getGroupsSchema = {
  params: paramsJsonGroupsSchema,
};

export const addGroupSchema = fastJson({
  body: bodyJsonSchema,
  params: paramsJsonSchema,
});

export const deleteGroupSchema = {
  params: paramsJsonSchemaDelete,
};

export const updateGroupSchema = {
  // params: paramsJsonSchemaAdd,
};

export const addMemberSchema = fastJson({
  params: paramsJsonGroupsSchema,
});
