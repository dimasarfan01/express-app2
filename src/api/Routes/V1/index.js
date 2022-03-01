const express = require('express');
const router = express.Router();

defaultRoutes = [
  {
    path: '/category',
    route: require('./category'),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route['path'], route['route']);
});

module.exports = router;
