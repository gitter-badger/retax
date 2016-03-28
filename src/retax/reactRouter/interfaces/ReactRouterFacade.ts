export interface IMatchArgs extends ReactRouter.MatchArgs {};

export interface IMatchResult {
  redirectLocation: HistoryModule.Location;
  renderProps: ReactRouter.IRouterContextProps;
}

export interface IReactRouterFacade {
  match(args: IMatchArgs): Promise<IMatchResult>;
}
