import { IKernel } from 'inversify';

import { IServerConfigProxy } from './interfaces';
import ServerConfigProxy from './ServerConfigProxy';

export const SERVER_CONFIG_PROXY = Symbol('ServerConfigProxy');

export function serverConfigProxyModule(kernel: IKernel): void {
  kernel.bind<IServerConfigProxy>(SERVER_CONFIG_PROXY).to(ServerConfigProxy).inSingletonScope();
}
