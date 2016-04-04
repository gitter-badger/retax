import { IKernel, INewable } from 'inversify';

import { IRetaxConfigProxy, RetaxConfigProxy } from '../configProxy';
import { IReduxFacade, ReduxFacade } from '../redux';
import { IReactRouterFacade, ReactRouterFacade } from '../reactRouter';

import { IRetaxConfig, retaxConfig } from '../config';
import { IConfigStore, createConfigStore } from '../../utils';
import { RetaxProvider } from '../components';

export default function retaxModule(kernel: IKernel): void {
  kernel.bind<IRetaxConfigProxy>(RetaxConfigProxy).to(RetaxConfigProxy).inSingletonScope();
  kernel.bind<IReduxFacade>(ReduxFacade).to(ReduxFacade).inSingletonScope();
  kernel.bind<IReactRouterFacade>(ReactRouterFacade).to(ReactRouterFacade).inSingletonScope();

  kernel.bind<IConfigStore<IRetaxConfig>>('RetaxConfigStore').toValue(createConfigStore(retaxConfig));

  // constructor
  kernel.bind<INewable<RetaxProvider>>('RetaxProvider').toConstructor(RetaxProvider);
}
