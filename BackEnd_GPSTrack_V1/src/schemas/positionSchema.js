const bodyJsonSchema = {
  type: 'object',
  required: ['latitude', 'longitude', 'codeEvenement'],
  properties: {
    latitude: { type: 'number', maximum: 90, maxLength: 22 },
    longitude: { type: 'number', maximum: 180, maxLength: 22 },
    utilisateurPosition: { type: 'integer' },
    codeEvenement: { type: 'string' },
    datePosition: { type: 'number' },
  },
};

const paramsJsonSchemaAdd = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

const paramsJsonSchemaGet = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

const paramsJsonSchemaGroup = {
  type: 'object',
  required: ['id', 'codeGroup'],
  properties: {
    id: { type: 'number' },
    codeGroup: { type: 'string' },
  },
};

export const addPositionSchema = {
  body: bodyJsonSchema,
  params: paramsJsonSchemaAdd,
};

export const getPositionSchema = {
  params: paramsJsonSchemaGet,
};

export const getPositionsSchema = {
  params: paramsJsonSchemaGroup,
};
