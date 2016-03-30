import { IKernel } from 'inversify';

import { IRetaxConfigProxy, RetaxConfigProxy } from '../configProxy';
import { IReduxFacade, ReduxFacade } from '../redux';
import { IReactRouterFacade, ReactRouterFacade } from '../reactRouter';

import { IRetaxConfig, retaxConfig } from '../config';
import { IConfigStore, createConfigStore } from '../../utils';

export default function retaxModule(kernel: IKernel): void {
  kernel.bind<IRetaxConfigProxy>('RetaxConfigProxy').to(RetaxConfigProxy);
  kernel.bind<IReduxFacade>('ReduxFacade').to(ReduxFacade);
  kernel.bind<IReactRouterFacade>('ReactRouterFacade').to(ReactRouterFacade);

  kernel.bind<IConfigStore<IRetaxConfig>>('RetaxConfigStore').toValue(createConfigStore(retaxConfig));
}
