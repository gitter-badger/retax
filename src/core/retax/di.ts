import { IKernel } from 'inversify';

import { BOOTSTRAPPER, bootstrapperModule, domBootstrapperModule, requestBootstrapperModule } from './bootstrap';
import { COMPONENTS, componentsModule, retaxComponentsModule } from './components';
import { CONFIG, configModule } from './config';
import { RETAX_CONFIG_PROXY, retaxConfigProxyModule } from './configProxy';
import { COOKIE_PROXIES, cookieProxiesModule, domCookieProxyModule, requestCookieProxyModule } from './cookieProxies';
import { JSX_BUILDERS, JSXBuildersModule, clientBuilderModule, serverBuilderModule } from './JSXBuilders';
import { REACT_ROUTER_FACADE, reactRouterFacadeModule } from './reactRouter';
import { REDUX_FACADE, reduxFacadeModule } from './redux';
import { STATE_PROXIES, stateProxiesModule, domStateProxyModule, requestStateProxyModule } from './stateProxies';

export const RETAX = {
  BOOTSTRAPPER,
  COMPONENTS,
  CONFIG,
  RETAX_CONFIG_PROXY,
  COOKIE_PROXIES,
  JSX_BUILDERS,
  REACT_ROUTER_FACADE,
  REDUX_FACADE,
  STATE_PROXIES,
};

export function baseRetaxModule(kernel: IKernel): void {
  kernel.load(configModule);
  kernel.load(retaxConfigProxyModule);
  kernel.load(reactRouterFacadeModule);
  kernel.load(reduxFacadeModule);
}

export function retaxModule(kernel: IKernel): void {
  kernel.load(baseRetaxModule);

  kernel.load(bootstrapperModule);
  kernel.load(componentsModule);
  kernel.load(cookieProxiesModule);
  kernel.load(JSXBuildersModule);
  kernel.load(stateProxiesModule);
}

export function retaxClientModule(kernel: IKernel): void {
  kernel.load(baseRetaxModule);

  kernel.load(domBootstrapperModule);
  kernel.load(retaxComponentsModule);
  kernel.load(domCookieProxyModule);
  kernel.load(clientBuilderModule);
  kernel.load(domStateProxyModule);
}

export function retaxServerModule(kernel: IKernel): void {
  kernel.load(baseRetaxModule);

  kernel.load(requestBootstrapperModule);
  kernel.load(componentsModule);
  kernel.load(requestCookieProxyModule);
  kernel.load(serverBuilderModule);
  kernel.load(requestStateProxyModule);
}
