import { IKernel } from 'inversify';

import { IReduxFacade } from './interfaces';
import ReduxFacade from './ReduxFacade';

export const REDUX_FACADE = Symbol('ReduxFacade');

export function reduxFacadeModule(kernel: IKernel): void {
  kernel.bind<IReduxFacade>(REDUX_FACADE).to(ReduxFacade).inSingletonScope();
}
