const Joi = require('joi');

// User validation schemas
const userSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    email: Joi.string().email(),
    currentPassword: Joi.string().when('password', {
      is: Joi.exist(),
      then: Joi.required()
    }),
    password: Joi.string().min(6),
    confirmPassword: Joi.string().valid(Joi.ref('password'))
  })
};

// Transaction validation schemas
const transactionSchemas = {
  createTopup: Joi.object({
    playerId: Joi.string().required(),
    packageId: Joi.number().integer().positive().required(),
    paymentMethod: Joi.string().valid('stripe', 'paypal', 'bank_transfer').required()
  }),

  checkPlayer: Joi.object({
    playerId: Joi.string().required(),
    game: Joi.string().valid('freefire', 'mobilelegends', 'pubgmobile').required()
  })
};

// Package validation schemas
const packageSchemas = {
  create: Joi.object({
    name: Joi.string().required(),
    diamonds: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    currency: Joi.string().default('MYR'),
    shellCost: Joi.number().integer().positive().required(),
    isActive: Joi.boolean().default(true),
    sortOrder: Joi.number().integer().default(0)
  }),

  update: Joi.object({
    name: Joi.string(),
    diamonds: Joi.number().integer().positive(),
    price: Joi.number().positive(),
    currency: Joi.string(),
    shellCost: Joi.number().integer().positive(),
    isActive: Joi.boolean(),
    sortOrder: Joi.number().integer()
  })
};

// Admin validation schemas
const adminSchemas = {
  updateTransaction: Joi.object({
    status: Joi.string().valid('pending', 'paid', 'processing', 'completed', 'failed', 'refunded').required(),
    notes: Joi.string().allow('')
  }),

  createPackage: packageSchemas.create,

  updatePackage: packageSchemas.update
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    req.body = value;
    next();
  };
};

// Query parameter validation
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: 'Query validation failed',
        details: errors
      });
    }

    req.query = value;
    next();
  };
};

module.exports = {
  userSchemas,
  transactionSchemas,
  packageSchemas,
  adminSchemas,
  validate,
  validateQuery
};
