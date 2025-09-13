export type TBlockProps = Record<string, any>;

// FIXME SKV: попробовать через const
export type TBlockEvents =
  | 'init'
  | 'component-did-mount'
  | 'component-did-update'
  | 'render';

export interface IBlock<T extends TBlockProps = TBlockProps> {
  getContent(): HTMLElement | null;
  setProps(nextProps: Partial<T>): void;
  show(): void;
  hide(): void;
  remove(): void;
}

export interface IBlockConstructor<T extends TBlockProps = TBlockProps> {
  new (props: T): IBlock<T>;
}
