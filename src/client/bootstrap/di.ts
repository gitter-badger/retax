import { IKernel } from 'inversify';

import { IClientBootstrapper } from './interfaces';
import ClientBootstrapper from './ClientBootstrapper';

export const CLIENT_BOOTSTRAPPER = Symbol('ClientBootstrapper');

export function clientBootstrapperModule(kernel: IKernel): void {
  kernel.bind<IClientBootstrapper>(CLIENT_BOOTSTRAPPER).to(ClientBootstrapper).inSingletonScope();
}
