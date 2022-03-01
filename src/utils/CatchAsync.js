exports.catchAsync = (func) => (request, response, next) => {
  Promise.resolve(func(request, response, next)).catch((error) => {
    process.stdout.write(`Log Error : ${error} \n`);
    console.log(error);
    if (error.isJoi === true) error.status = 400;
    next(error);
  });
};
