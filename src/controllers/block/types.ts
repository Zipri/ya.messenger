/** Пропсы для компонентов внутри компонента */
export type TBlockProps = {
  [key: string]: any;
};

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
