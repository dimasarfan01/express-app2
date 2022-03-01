const route = require('express').Router();

const controller = require('../../Controllers/V1/CategoryController');

route.post('/', controller.createCategory);
route.get('/', controller.getAllCategory);
route.put('/:id', controller.updateCategoryById);
route.delete('/:id', controller.deleteCategoryById);
route.get('/find', controller.getCategoryBySlugOrId);

module.exports = route;
