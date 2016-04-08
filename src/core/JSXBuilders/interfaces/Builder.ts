import { IIsomorphicTools } from '../../bootstrap';
import { IInversifyKernelFacade } from '../../inversifyKernelFacade';

export interface IBuilderConfig {
  kernel: IInversifyKernelFacade;
  store: Redux.Store;
  renderProps: ReactRouter.IRouterContextProps;
  isomorphicTools?: IIsomorphicTools;
}

export interface IJSXBuilder {
  build(options: IBuilderConfig): JSX.Element;
}
