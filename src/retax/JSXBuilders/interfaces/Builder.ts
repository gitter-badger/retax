import { IIsomorphicTools } from '../../../config';

export interface IBuilderConfig {
  store: Redux.Store;
  renderProps: ReactRouter.IRouterContextProps;
  isomorphicTools?: IIsomorphicTools;
}

export interface IJSXBuilder {
  build(options: IBuilderConfig): JSX.Element;
}
