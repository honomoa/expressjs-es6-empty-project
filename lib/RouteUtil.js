
class RouteUtil {
  constructor() {
    this.routeList = [];
  }

  addRouter(method, path, func, protect) {
    this.routeList.push({
      method,
      path,
      func,
      protect,
    });
  }

  getRouters() {
    return this.routeList;
  }

  binding(expressRouter) {
    this.expressRouter = expressRouter;
    _.forEach(this.routeList, (router) => {
      if (router.protect) {
        expressRouter[router.method](router.path, router.protect, router.func);
      } else {
        expressRouter[router.method](router.path, router.func);
      }
    });
  }
}

module.exports = exports = RouteUtil;
