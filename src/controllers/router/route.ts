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
  private _params: Record<string, string> = {};

  constructor(props: RouteProps) {
    const { pathname, view, rootQuery, props: routeProps } = props;

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
    this._props = routeProps;
  }

  // FIXME SKV (!)
  // navigate(pathname: string) {
  //   // урл соответствует урлу блока
  //   if (this.match(pathname)) {
  //     this._pathname = pathname;
  //     this.render();
  //   }
  // }

  delete() {
    if (this._block) {
      this._block.remove();
      this._block = null;
    }
  }

  match(pathname: string) {
    const paramNames: string[] = [];
    const regexPath = this._pathname.replace(/:(\w+)/g, (_match, paramName) => {
      paramNames.push(paramName);
      return '([^\\/]+)';
    });

    const match = pathname.match(new RegExp(`^${regexPath}$`));

    if (match) {
      this._params = paramNames.reduce(
        (acc, name, index) => {
          acc[name] = match[index + 1];
          return acc;
        },
        {} as Record<string, string>
      );
      return true;
    }

    return false;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({ ...this._props, ...this._params });
      this._renderBlock(this._block);
    }
  }

  private _renderBlock(block: Block) {
    const root = document.querySelector(this._rootQuery)!;
    root.replaceChildren();
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }
}

export default Route;
