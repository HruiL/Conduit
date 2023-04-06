const { aliasWebpack } = require("react-app-alias");

// config是react项目的webpack默认配置
module.exports = function override(config) {
  // aliasWebpack() 调用之后webpack会去找 jsconfig.json文件
  return aliasWebpack()(config);
};
