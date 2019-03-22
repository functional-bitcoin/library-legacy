/**
 * @function    agent/router
 * @description [description]
 * @param       args [description]
 * @return      [description]
 */
module.exports = ({ ctx, $agent }) => {
  let routes;
  try {
    routes = JSON.parse(ctx.data.toString());
  } catch(e) {
    throw new Error('Invalid context')
  }

  return {
    version: 1,
    routes,

    match(path) {
      const joinPath = (...parts) => [path, ...parts].join('/').replace(/\/\//, '/');
      const route = this.routes[path] ||
        this.routes[joinPath('index.html')] ||
        this.routes[joinPath('index.htm')];

      if (!route) throw new Error('Not found');
      return route;
    },

    handle(path) {
      const route = this.match(path);
      return $agent.runScript(route.b)
    }
  }
}