import { IKernel, IKernelModule } from 'inversify';

import { RetaxProvider, ILifecycleService } from '../../components';
import { IInternalConfigStore, InternalConfigStore } from '../../configStores';
import { IReactRouterFacade, ReactRouterFacade } from '../../reactRouter';
import { IReduxFacade, ReduxFacade } from '../../redux';
import { IRetaxMediator, RetaxMediator } from '../../mediator';
import { IContext } from '../../context';
import { ILifecycleConfig } from '../../configStores';

import {
  MEDIATOR,
  COMPONENTS,
  CONFIG_STORES,
  REACT_ROUTER_FACADE,
  REDUX_FACADE,
  CONTEXT,
  WILL_RESOLVE_ROUTE_HOOK,
} from '../identifiers';

export default function commonModule(kernel: IKernel): void {
  kernel.bind<IRetaxMediator>(MEDIATOR).to(RetaxMediator).inSingletonScope();
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

export function lifecycleModuleFactory(lifecycleConfig: ILifecycleConfig): IKernelModule {
  return function lifecycleModule(kernel: IKernel): void {
    if (lifecycleConfig.willResolveRoute) {
      kernel.bind<ILifecycleService>(WILL_RESOLVE_ROUTE_HOOK).to(lifecycleConfig.willResolveRoute);
    } else {
      kernel.bind<ILifecycleService>(WILL_RESOLVE_ROUTE_HOOK).toValue(undefined);
    }
  };
}
