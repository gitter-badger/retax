import { IKernel } from 'inversify';

import AbstractApi from './AbstractApi';

export const ABSTRACT_API = Symbol('AbstractApi');

export function abstractApiModule(kernel: IKernel): void {
  kernel.bind<typeof AbstractApi>(ABSTRACT_API).toValue(AbstractApi);
}
