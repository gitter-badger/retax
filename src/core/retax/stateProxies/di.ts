import { IKernel } from 'inversify';

import { IStateProxy } from './interfaces';
import DomStateProxy from './DomStateProxy';
import RequestStateProxy from './RequestStateProxy';

export const DOM_STATE_PROXY = Symbol('DomStateProxy');
export const REQUEST_STATE_PROXY = Symbol('RequestStateProxy');

export const STATE_PROXIES = { DOM_STATE_PROXY, REQUEST_STATE_PROXY };

export function domStateProxyModule(kernel: IKernel): void {
  kernel.bind<IStateProxy>(DOM_STATE_PROXY).to(DomStateProxy).inSingletonScope();
}

export function requestStateProxyModule(kernel: IKernel): void {
  kernel.bind<IStateProxy>(REQUEST_STATE_PROXY).to(RequestStateProxy).inSingletonScope();
}

export function stateProxiesModule(kernel: IKernel): void {
  kernel.load(domStateProxyModule);
  kernel.load(requestStateProxyModule);
}
