import { IKernel } from 'inversify';

import { RetaxProvider } from '../../components';
import { IRetaxConfigProxy, RetaxConfigProxy } from '../../configProxy';
import { IInternalConfigStore, IRetaxConfigStore, internalConfigStore, retaxConfigStore } from '../../configStores';
import { IReactRouterFacade, ReactRouterFacade } from '../../reactRouter';
import { IReduxFacade, ReduxFacade } from '../../redux';

import {
  COMPONENTS,
  RETAX_CONFIG_PROXY,
  CONFIG_STORES,
  REACT_ROUTER_FACADE,
  REDUX_FACADE,
} from '../identifiers';

export default function commonModule(kernel: IKernel): void {
  kernel.bind<IRetaxConfigProxy>(RETAX_CONFIG_PROXY).to(RetaxConfigProxy);
  kernel.bind<IReactRouterFacade>(REACT_ROUTER_FACADE).to(ReactRouterFacade);
  kernel.bind<IReduxFacade>(REDUX_FACADE).to(ReduxFacade).inSingletonScope();

  kernel.bind<typeof RetaxProvider>(COMPONENTS.RETAX_PROVIDER_COMPONENT).toConstructor(RetaxProvider);

  kernel.bind<IRetaxConfigStore>(CONFIG_STORES.RETAX_CONFIG_STORE).toValue(retaxConfigStore);
  kernel.bind<IInternalConfigStore>(CONFIG_STORES.INTERNAL_CONFIG_STORE).toValue(internalConfigStore);
}
