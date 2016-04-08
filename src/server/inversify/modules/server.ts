import { IKernel } from 'inversify';

import { IServerBootstrapper, ServerBootstrapper } from '../../bootstrap';
import { IServerConfigProxy, ServerConfigProxy } from '../../configProxy';
import { IServerConfigStore, serverConfigStore } from '../../configStores';
import { IRetaxMiddlewareFactory, StaticMiddlewareFactory, RenderingMiddlewareFactory } from '../../middlewares';

import {
  IInternalConfigStore, internalConfigStore,
  INTERNAL_CONFIG_STORE,
} from '../../../core';

import {
  SERVER_BOOTSTRAPPER,
  SERVER_CONFIG_PROXY,
  SERVER_CONFIG_STORE,
  MIDDLEWARES,
} from '../identifiers';

export default function serverModule(kernel: IKernel): void {
  kernel.bind<IServerBootstrapper>(SERVER_BOOTSTRAPPER).to(ServerBootstrapper);
  kernel.bind<IServerConfigProxy>(SERVER_CONFIG_PROXY).to(ServerConfigProxy);
  kernel.bind<IServerConfigStore>(SERVER_CONFIG_STORE).toValue(serverConfigStore);
  kernel.bind<IRetaxMiddlewareFactory>(MIDDLEWARES.STATIC_MIDDLEWARE_FACTORY).to(StaticMiddlewareFactory);
  kernel.bind<IRetaxMiddlewareFactory>(MIDDLEWARES.RENDERING_MIDDLEWARE_FACTORY).to(RenderingMiddlewareFactory);

  kernel.bind<IInternalConfigStore>(INTERNAL_CONFIG_STORE).toValue(internalConfigStore);
}
