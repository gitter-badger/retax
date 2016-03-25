export interface IAppTemplateOptions {
  store: Redux.Store;
  routes: ReactRouter.PlainRoute | ReactRouter.RouteElement;
  history: HistoryModule.History;
  children?: JSX.Element;
}

export interface IRendererOptions extends IAppTemplateOptions {
  mountPoint: Element;
}

export interface IRenderer {
  render(options: IRendererOptions): void;
}
