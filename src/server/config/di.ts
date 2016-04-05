import { IKernel } from 'inversify';

import { IServerConfig } from './interfaces';
import serverConfig from './serverConfig';

import { IConfigStore, createConfigStore } from '../../utils';

export const SERVER_CONFIG_STORE = Symbol('serverConfigStore');

export function serverConfigModule(kernel: IKernel): void {
  kernel.bind<IConfigStore<IServerConfig>>(SERVER_CONFIG_STORE).toValue(createConfigStore(serverConfig));
}
