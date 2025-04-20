import Joi from 'joi';

const roomSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Room name must be a string',
    'any.required': 'Room name is required',
  }),
  authorId: Joi.string().required().messages({
    'string.base': 'Author ID must be a string',
    'any.required': 'Author ID is required',
  }),
  authorName: Joi.string().required().messages({
    'string.base': 'Author name must be a string',
    'any.required': 'Author name is required',
  }),
  isPrivate: Joi.boolean().required().messages({
    'boolean.base': 'Room privacy must be a boolean',
    'any.required': 'Room privacy is required',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Room description must be a string',
  }),
});

export default roomSchema;
