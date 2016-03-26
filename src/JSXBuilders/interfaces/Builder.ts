export interface IBuilderConfig {
  store: Redux.Store;
  renderProps: ReactRouter.IRouterContextProps;
}

export interface IJSXBuilder {
  build(options: IBuilderConfig): JSX.Element;
}
