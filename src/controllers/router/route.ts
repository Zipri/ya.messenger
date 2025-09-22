import { Block } from '@controllers';

interface RouteProps {
  pathname: string;
  view: typeof Block;
  rootQuery: string;
  props?: Record<string, any>;
}

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _rootQuery: string;
  private _props?: Record<string, any>;

  constructor(props: RouteProps) {
    const { pathname, view, rootQuery, props: routeProps } = props;

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
    this._props = routeProps;
  }

  navigate(pathname: string) {
    // урл соответствует урлу блока
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props || {});
      this._renderBlock(this._block);
      return;
    }

    this._block.show();
  }

  private _renderBlock(block: Block) {
    const root = document.querySelector(this._rootQuery)!;
    root.replaceChildren();
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }
}

export default Route;
