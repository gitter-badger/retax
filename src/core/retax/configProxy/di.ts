import { IKernel } from 'inversify';

import { IRetaxConfigProxy } from './interfaces';
import RetaxConfigProxy from './RetaxConfigProxy';

export const RETAX_CONFIG_PROXY = Symbol('RetaxConfigProxy');

export function retaxConfigProxyModule(kernel: IKernel): void {
  kernel.bind<IRetaxConfigProxy>(RETAX_CONFIG_PROXY).to(RetaxConfigProxy).inSingletonScope();
}
