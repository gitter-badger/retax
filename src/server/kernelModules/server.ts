import { IKernel } from 'inversify';

import { IServerBoostrapper, ServerBootstrapper } from '../bootstrap';
import { IServerConfigProxy, ServerConfigProxy } from '../configProxy';
import { IRetaxMiddlewareFactory, StaticMiddlewareFactory, RenderingMiddlewareFactory } from '../middlewares';
import { IServerConfig, serverConfig } from '../config';
import { IConfigStore, createConfigStore } from '../../utils';

export default function serverModule(kernel: IKernel): void {
  kernel.bind<IServerBoostrapper>('ServerBootstrapper').to(ServerBootstrapper).inSingletonScope();
  kernel.bind<IServerConfigProxy>('ServerConfigProxy').to(ServerConfigProxy).inSingletonScope();
  kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(StaticMiddlewareFactory).inSingletonScope();
  kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(RenderingMiddlewareFactory).inSingletonScope();

  kernel.bind<IConfigStore<IServerConfig>>('ServerConfigStore').toValue(createConfigStore(serverConfig));
}
