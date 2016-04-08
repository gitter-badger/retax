import { IKernel } from 'inversify';

import commonModule from './common';

import { Html } from '../../components';
import { IRequestBootstrapper, RequestBootstrapper } from '../../bootstrap';
import { IRequestCookieProxy, RequestCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ServerBuilder } from '../../JSXBuilders';
import { IStateProxy, RequestStateProxy } from '../../stateProxies';

import {
  COMPONENTS,
  BOOTSTRAPPERS,
  COOKIE_PROXIES,
  JSX_BUILDERS,
  STATE_PROXIES,
} from '../identifiers';

export default function serverModule(kernel: IKernel): void {
  kernel.load(commonModule);

  kernel.bind<IRequestBootstrapper>(BOOTSTRAPPERS.REQUEST_BOOTSTRAPPER).to(RequestBootstrapper);
  kernel.bind<IRequestCookieProxy>(COOKIE_PROXIES.REQUEST_COOKIE_PROXY).to(RequestCookieProxy);
  kernel.bind<IJSXBuilder>(JSX_BUILDERS.SERVER_BUILDER).to(ServerBuilder);
  kernel.bind<IStateProxy>(STATE_PROXIES.REQUEST_STATE_PROXY).to(RequestStateProxy);

  kernel.bind<typeof Html>(COMPONENTS.HTML_COMPONENT).toConstructor(Html);
}
