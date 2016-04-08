import { IKernel } from 'inversify';

import commonModule from './common';

import { IDomBootstrapper, DomBootstrapper } from '../../bootstrap';
import { IDomCookieProxy, DomCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ClientBuilder } from '../../JSXBuilders';
import { IStateProxy, DomStateProxy } from '../../stateProxies';

import {
  BOOTSTRAPPERS,
  COOKIE_PROXIES,
  JSX_BUILDERS,
  STATE_PROXIES,
} from '../identifiers';

export default function clientModule(kernel: IKernel): void {
  kernel.load(commonModule);

  kernel.bind<IDomBootstrapper>(BOOTSTRAPPERS.DOM_BOOTSTRAPPER).to(DomBootstrapper);
  kernel.bind<IDomCookieProxy>(COOKIE_PROXIES.DOM_COOKIE_PROXY).to(DomCookieProxy);
  kernel.bind<IJSXBuilder>(JSX_BUILDERS.CLIENT_BUILDER).to(ClientBuilder);
  kernel.bind<IStateProxy>(STATE_PROXIES.DOM_STATE_PROXY).to(DomStateProxy);
}
