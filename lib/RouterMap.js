'use strict';

class RouterMap {
  constructor() {
    this.routerMap = [];
  }

  addRouter(method, path, func, protect) {
    this.routerMap.push({
      method,
      path,
      func,
      protect,
    });
  }

  getRouters() {
    return this.routerMap;
  }
}

module.exports = RouterMap;
