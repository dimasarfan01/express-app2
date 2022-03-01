const Joi = require('joi');

const schemaCreateCategoryRequest = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

const schemaGetAllCategoryRequest = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).default(3),
});

const schemaGetCategoryBySlugOrIdRequest = Joi.object().keys({
  value: Joi.string().optional(),
});

const schemaUpdateCategoryById = Joi.object({
  name: Joi.string(),
  id: Joi.string(),
});

module.exports = {
  schemaCreateCategoryRequest,
  schemaGetAllCategoryRequest,
  schemaGetCategoryBySlugOrIdRequest,
  schemaUpdateCategoryById,
};
