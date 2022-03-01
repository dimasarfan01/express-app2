const { catchAsync } = require('../../../utils');
const {
  createCategoryService,
  getAllCategoriesService,
  getCategoryBySlugOrIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
} = require('../../Services/V1/CategoryService');
const {
  schemaCreateCategoryRequest,
  schemaGetAllCategoryRequest,
  schemaUpdateCategoryById,
  schemaGetCategoryBySlugOrIdRequest,
} = require('../../Requests/V1/CategoryRequest');

const createCategory = catchAsync(async function (request, response) {
  const validation = await schemaCreateCategoryRequest.validateAsync(
    request.body
  );
  const service = await createCategoryService(validation);
  return response.status(service.code).json(service.send);
});

const getAllCategory = catchAsync(async function (request, response) {
  const { page = 1, perPage = 3 } = request.query;

  const validation = await schemaGetAllCategoryRequest.validateAsync({
    page,
    perPage,
  });
  const service = await getAllCategoriesService(validation);
  return response.status(service.code).json(service.send);
});

const getCategoryBySlugOrId = catchAsync(async function (request, response) {
  const validation = await schemaGetCategoryBySlugOrIdRequest.validateAsync(
    request.query
  );
  const service = await getCategoryBySlugOrIdService(validation.value);
  return response.status(service.code).json(service.send);
});

const updateCategoryById = catchAsync(async function (request, response) {
  const { id } = request.params;
  const { name } = request.body;

  const validation = await schemaUpdateCategoryById.validateAsync({ id, name });
  const service = await updateCategoryByIdService(validation);
  return response.status(service.code).json(service.send);
});

const deleteCategoryById = catchAsync(async function (request, response) {
  const service = await deleteCategoryByIdService(request.params.id);
  return response.status(service.code).json(service.send);
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryBySlugOrId,
  updateCategoryById,
  deleteCategoryById,
};
