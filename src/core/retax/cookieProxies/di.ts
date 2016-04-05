import { IKernel } from 'inversify';

import { IDomCookieProxy, IRequestCookieProxy } from './interfaces';
import DomCookieProxy from './DomCookieProxy';
import RequestCookieProxy from './RequestCookieProxy';

export const DOM_COOKIE_PROXY = Symbol('DomCookieProxy');
export const REQUEST_COOKIE_PROXY = Symbol('RequestCookieProxy');

export const COOKIE_PROXIES = { DOM_COOKIE_PROXY, REQUEST_COOKIE_PROXY };

export function domCookieProxyModule(kernel: IKernel): void {
  kernel.bind<IDomCookieProxy>(DOM_COOKIE_PROXY).to(DomCookieProxy).inSingletonScope();
}

export function requestCookieProxyModule(kernel: IKernel): void {
  kernel.bind<IRequestCookieProxy>(REQUEST_COOKIE_PROXY).to(RequestCookieProxy).inSingletonScope();
}

export function cookieProxiesModule(kernel: IKernel): void {
  kernel.load(domCookieProxyModule);
  kernel.load(requestCookieProxyModule);
}
