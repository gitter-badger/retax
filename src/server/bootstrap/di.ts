import { IKernel } from 'inversify';

import { IServerBootstrapper } from './interfaces';
import ServerBootstrapper from './ServerBootstrapper';

export const SERVER_BOOTSTRAPPER = Symbol('ServerBootstrapper');

export function serverBootstrapperModule(kernel: IKernel): void {
  kernel.bind<IServerBootstrapper>(SERVER_BOOTSTRAPPER).to(ServerBootstrapper).inSingletonScope();
}
