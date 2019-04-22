/**
 * @function    agent/router
 * @description [description]
 * @param       args [description]
 * @return      [description]
 */
module.exports = ({ ctx, $agent }) => {
  let router;
  try {
    router = JSON.parse(ctx.data.toString());
  } catch(e) {
    throw new Error('Invalid context')
  }

  const defaults = {
    version: '1.1',
    options: {},
    routes: {}
  }

  const methods = {
    match(path) {
      const joinPath = (...parts) => [path, ...parts].join('/').replace(/\/\//, '/');
      const route = this.routes[path] ||
        this.routes[joinPath('index.html')] ||
        this.routes[joinPath('index.htm')];

      if (!route) {
        if ( this.options.spa && path !== this.options.spa && !/\.(?!html?)\w+$/i.test(path) ) {
          return this.match(this.options.spa);
        }

        throw new Error('Not found');
      }

      return route;
    },

    handle(path) {
      const route = this.match(path);
      return $agent.runScript(route.b)
    }
  }

  return Object.assign(defaults, router, methods);
}