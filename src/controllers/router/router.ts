import type { Block } from '@controllers/block';
import Route from './route';

class Router {
  private routes!: Route[];
  private history!: History;
  private _currentRoute!: Route | null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  use(pathname: string, block: typeof Block, props?: Record<string, any>) {
    const route = new Route({
      pathname,
      view: block,
      rootQuery: this._rootQuery,
      props,
    });

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    if (route) {
      route.render();
    }
  }

  private _getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}

/** Singleton instance of Router */
export default new Router('#app');
