import { IKernel } from 'inversify';

import { CLIENT_BOOTSTRAPPER, clientBootstrapperModule } from './bootstrap';

export const CLIENT = { CLIENT_BOOTSTRAPPER };

export function clientModule(kernel: IKernel): void {
  kernel.load(clientBootstrapperModule);
}
