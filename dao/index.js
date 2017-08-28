/**
 * Created by wangxuquan on 2017/5/8.
 */
exports.save = function (model,params,fn) {
  const instance = new model(params);
  instance.save(fn);
};

exports.update = function (model,ops,set,fn) {
  model.update(ops,set,fn);
};

exports.find = function (model,ops,fn) {
  model.find(ops,fn);
};