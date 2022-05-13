import fastJson from 'fast-json-stringify';
const bodyJsonSchemaUpdate = {
  type: 'object',
  properties: {
    pseudo: { type: 'string', minLength: 5, maxLength: 25 },
    prenom: { type: 'string', minLength: 2, maxLength: 25 },
    nom: { type: 'string', minLength: 2, maxLength: 25 },
    mail: { type: 'string', maxLength: 50 },
    motDePasse: { type: 'string', maxLength: 50 },
    numeroTelephone: { type: 'number', minLength: 10, maxLength: 10 },
    photoProfil: { type: 'string', maxLength: 80 },
    statusTracking: { type: 'string' },
  },
};

const paramsJsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

export const getUserSchema = {
  params: paramsJsonSchema,
};

export const deleteUserSchema = {
  params: paramsJsonSchema,
};

export const updateUserSchema = fastJson({
  body: bodyJsonSchemaUpdate,
  params: paramsJsonSchema,
});
