import { IKernel } from 'inversify';
import { IIsomorphicTools } from '../../bootstrap';

export interface IBuilderConfig {
  kernel: IKernel;
  store: Redux.Store;
  renderProps: ReactRouter.IRouterContextProps;
  isomorphicTools?: IIsomorphicTools;
}

export interface IJSXBuilder {
  build(options: IBuilderConfig): JSX.Element;
}
