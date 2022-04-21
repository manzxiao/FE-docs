// loader-utils是专门用于自定义loader时的一些工具函数
const { getOptions } = require('loader-utils');

module.exports = function (source) {
  console.log('The original file was here:1', this.resourcePath);
  const options = getOptions(this); // getOptions用于获取配置
  // console.info(options, source.replace(/你麻痹/g, '你爹爹'));
  return source.replace(/你麻痹/g, '你爹爹').replace(/为什么不成功/g, '成功了');
  // return source.replace(/你麻痹/g, options.words);
};
