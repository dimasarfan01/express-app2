const { slugify } = require('../../../utils');
const { Category } = require('../../Models');
const sequelize = require('sequelize');
const ApiError = require('../../../utils/ApiError');

async function createCategoryService(body) {
  const category = await Category.create({ name: body, slug: slugify(body) });

  return {
    code: 201,
    send: {
      message: 'Category created successfully',
      data: category,
    },
  };
}

async function getAllCategoriesService({ page, perPage }) {
  const categories = await Category.findAll({
    limit: parseInt(perPage),
    offset: (page - 1) * parseInt(perPage),
  });

  return {
    code: 200,
    send: {
      message: 'Categories fetched successfully',
      data: categories,
    },
  };
}

async function getCategoryBySlugOrIdService(value) {
  const Op = sequelize.Op;

  const category = await Category.findOne({
    where: {
      [Op.or]: [{ slug: value }, { id: value }],
    },
  });

  if (!category) throw new ApiError(404, 'Error', 'Category not found');

  return {
    code: 200,
    send: {
      message: 'Category fetched successfully',
      data: category,
    },
  };
}

async function updateCategoryByIdService({ id, name }) {
  const category = await Category.findOne({ where: { id } });

  if (!category) throw new ApiError(404, 'Error', 'Category not found');

  const updateCategory = await category.update({ name, slug: slugify(name) });

  return {
    code: 200,
    send: {
      message: 'Category updated successfully',
      data: updateCategory,
    },
  };
}

async function deleteCategoryByIdService(id) {
  const category = await Category.findOne({ where: { id } });

  if (!category) throw new ApiError(404, 'Error', 'Category not found');

  const deleteCategory = await category.destroy();

  return {
    code: 200,
    send: {
      message: 'Category deleted successfully',
      data: deleteCategory,
    },
  };
}

module.exports = {
  createCategoryService,
  getAllCategoriesService,
  getCategoryBySlugOrIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
};
