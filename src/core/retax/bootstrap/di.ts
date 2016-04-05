import { IKernel } from 'inversify';

import { IDomBootstrapper, IRequestBootstrapper } from './interfaces';
import DomBootstrapper from './DomBootstrapper';
import RequestBootstrapper from './RequestBootstrapper';

export const DOM_BOOTSTRAPPER = Symbol('DomBootstrapper');
export const REQUEST_BOOTSTRAPPER = Symbol('RequestBootstrapper');

export const BOOTSTRAPPER = { DOM_BOOTSTRAPPER, REQUEST_BOOTSTRAPPER };

export function domBootstrapperModule(kernel: IKernel): void {
  kernel.bind<IDomBootstrapper>(DOM_BOOTSTRAPPER).to(DomBootstrapper).inSingletonScope();
}

export function requestBootstrapperModule(kernel: IKernel): void {
  kernel.bind<IRequestBootstrapper>(REQUEST_BOOTSTRAPPER).to(RequestBootstrapper).inSingletonScope();
}

export function bootstrapperModule(kernel: IKernel): void {
  kernel.load(domBootstrapperModule);
  kernel.load(requestBootstrapperModule);
}
