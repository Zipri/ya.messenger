export type TBlockProps = Record<string, any>;

// FIXME SKV (!) переделать на enum
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
