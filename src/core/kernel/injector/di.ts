import { IKernel } from 'inversify';

import { IInjector } from './interfaces';
import Injector from './Injector';

export const INJECTOR = Symbol('Injector');
export const AGGREGATE_API_SERVICE = Symbol('AggregateApiService');

export function injectorModule(kernel: IKernel): void {
  kernel.bind<IInjector>(INJECTOR).to(Injector).inSingletonScope();
}
