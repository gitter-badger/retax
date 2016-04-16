import kernel from '../di/entry';

import { serverModule, middlewareFactoryModuleFactory, SERVER_BOOTSTRAPPER } from './inversify';
import { IServerBootstrapper } from './bootstrap';
import { IRetaxMiddleware } from './middlewares';
import { IServerConfig } from './configStores';

export default function retaxMiddleware(config: IServerConfig): IRetaxMiddleware {
  kernel.load(serverModule, middlewareFactoryModuleFactory(config.serverRendering));

  const bootstrap = kernel.get<IServerBootstrapper>(SERVER_BOOTSTRAPPER);

  bootstrap.config(config);

  return bootstrap.bootstrap();
}
