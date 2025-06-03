import Joi from 'joi';

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.base': 'Email must be a string',
    'any.required': 'Email is required',
  }),
  fullName: Joi.string().required().messages({
    'string.base': 'Full name must be a string',
    'any.required': 'Full name is required',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .messages({
      'any.required': 'Password is required',
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
});

export default userRegisterSchema;
