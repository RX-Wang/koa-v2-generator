/**
 * Created by wangxuquan on 2017/5/8.
 */
exports.save = function (model,params,fn) {
  const instance = new model(params);
  instance.save(fn);
};