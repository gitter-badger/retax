import { IKernel } from 'inversify';

import { SERVER_BOOTSTRAPPER, serverBootstrapperModule } from './bootstrap';
import { SERVER_CONFIG_STORE, serverConfigModule } from './config';
import { SERVER_CONFIG_PROXY, serverConfigProxyModule } from './configProxy';
import { MIDDLEWARES, middlewaresModule } from './middlewares';

export const SERVER = { SERVER_BOOTSTRAPPER, SERVER_CONFIG_STORE, SERVER_CONFIG_PROXY, MIDDLEWARES };

export function serverModule(kernel: IKernel): void {
  kernel.load(serverBootstrapperModule);
  kernel.load(serverConfigModule);
  kernel.load(serverConfigProxyModule);
  kernel.load(middlewaresModule);
}
