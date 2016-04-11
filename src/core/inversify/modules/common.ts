import { IKernel, IKernelModule } from 'inversify';

import { RetaxProvider } from '../../components';
import { IInternalConfigStore, InternalConfigStore } from '../../configStores';
import { IReactRouterFacade, ReactRouterFacade } from '../../reactRouter';
import { IReduxFacade, ReduxFacade } from '../../redux';
import { IContext } from '../../context';

import {
  COMPONENTS,
  CONFIG_STORES,
  REACT_ROUTER_FACADE,
  REDUX_FACADE,
  CONTEXT,
} from '../identifiers';

export default function commonModule(kernel: IKernel): void {
  kernel.bind<IReactRouterFacade>(REACT_ROUTER_FACADE).to(ReactRouterFacade).inSingletonScope();
  kernel.bind<IReduxFacade>(REDUX_FACADE).to(ReduxFacade).inSingletonScope();

  kernel.bind<typeof RetaxProvider>(COMPONENTS.RETAX_PROVIDER_COMPONENT).toConstructor(RetaxProvider);

  kernel.bind<IInternalConfigStore>(CONFIG_STORES.INTERNAL_CONFIG_STORE).to(InternalConfigStore).inSingletonScope();
}

export function contextModuleFactory(context: IContext): IKernelModule {
  return function contextModule(kernel: IKernel): void {
    kernel.bind<IContext>(CONTEXT).toValue(context);
  };
}
