import { IKernel } from 'inversify';

import { IRetaxConfig, IInternalConfig } from './interfaces';
import retaxConfig from './retaxConfig';
import internalConfig from './internalConfig';

import { IConfigStore, createConfigStore } from '../../../utils';

export const RETAX_CONFIG_STORE = Symbol('RetaxConfigStore');
export const INTERNAL_CONFIG_STORE = Symbol('InternalConfigStore');

export const CONFIG = { RETAX_CONFIG_STORE, INTERNAL_CONFIG_STORE };

export function retaxConfigModule(kernel: IKernel): void {
  kernel.bind<IConfigStore<IRetaxConfig>>(RETAX_CONFIG_STORE).toValue(createConfigStore(retaxConfig));
}

export function internalConfigModule(kernel: IKernel): void {
  kernel.bind<IConfigStore<IInternalConfig>>(INTERNAL_CONFIG_STORE).toValue(createConfigStore(internalConfig));
}

export function configModule(kernel: IKernel): void {
  kernel.load(retaxConfigModule);
  kernel.load(internalConfigModule);
}
