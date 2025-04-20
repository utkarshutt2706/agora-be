import Joi from 'joi';

export const chatSchema = Joi.object({
  authorId: Joi.string().required().messages({
    'string.base': 'Author ID must be a string',
    'any.required': 'Author ID is required',
  }),
  authorName: Joi.string().required().messages({
    'string.base': 'Author name must be a string',
    'any.required': 'Author name is required',
  }),
  body: Joi.string().required().messages({
    'string.base': 'Body must be a string',
    'any.required': 'Body is required',
  }),
  roomId: Joi.string().required().messages({
    'string.base': 'Room ID must be a string',
    'any.required': 'Room ID is required',
  }),
  extra: Joi.string().optional().messages({
    'string.base': 'Extra must be a string',
  }),
  type: Joi.string()
    .valid('text', 'image', 'imageWithText')
    .required()
    .messages({
      'string.base': 'Type must be a string',
      'any.required': 'Type is required',
      'any.only': 'Type must be either "text", "image", or "imageWithText"',
    }),
});
