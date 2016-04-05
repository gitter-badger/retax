import { IKernel } from 'inversify';

import { IReactRouterFacade } from './interfaces';
import ReactRouterFacade from './ReactRouterFacade';

export const REACT_ROUTER_FACADE = Symbol('ReactRouterFacade');

export function reactRouterFacadeModule(kernel: IKernel): void {
  kernel.bind<IReactRouterFacade>(REACT_ROUTER_FACADE).to(ReactRouterFacade).inSingletonScope();
}
