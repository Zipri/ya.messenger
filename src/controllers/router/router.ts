import type { Block } from '@controllers/block';
import { BASE_URLS } from '@models';

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

  use(
    pathname: string,
    block: object,
    // Могут передаваться различные атрибуты, в данном случае нет смысла конкретизировать
    props?: Record<string, any>
  ) {
    const route = new Route({
      pathname,
      view: block as typeof Block,
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

  getCurrentRoute() {
    return this._currentRoute?.getPathname() || '';
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (!route) {
      this.go(BASE_URLS.error);
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.delete();
    }

    this._currentRoute = route;
    route.render();
  }

  private _getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}

/** Singleton instance of Router */
export default new Router('#app');
