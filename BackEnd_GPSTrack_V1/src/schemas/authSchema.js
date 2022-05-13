const bodyJsonSchemaAdd = {
  type: 'object',
  required: ['pseudo', 'mail', 'motDePasse'],
  properties: {
    pseudo: { type: 'string', minLength: 5, maxLength: 25 },
    mail: { type: 'string', maxLength: 50 },
    motDePasse: { type: 'string', maxLength: 50 },
  },
};

const bodyJsonSchema = {
  type: 'object',
  required: ['mail', 'motDePasse'],
  properties: {
    mail: { type: 'string', maxLength: 50 },
    motDePasse: { type: 'string', maxLength: 50 },
  },
};

export const addUserSchema = {
  body: bodyJsonSchemaAdd,
};

export const loginUserSchema = {
  body: bodyJsonSchema,
};
