const hoatDongRouter = require('./hoatDong');

function route(app) {
  app.use('/api/hoat-dong', hoatDongRouter);
}

module.exports = route;