import { IKernel, INewable } from 'inversify';

import { IRequestBootstrapper, RequestBootstrapper } from '../bootstrap';
import { IStateProxy, RequestStateProxy } from '../stateProxies';
import { IRequestCookieProxy, RequestCookieProxy } from '../cookieProxies';
import { IJSXBuilder, ServerBuilder } from '../JSXBuilders';
import { Html } from '../components';

export default function requestModule(kernel: IKernel): void {
  kernel.bind<IRequestBootstrapper>(RequestBootstrapper).to(RequestBootstrapper).inSingletonScope();
  kernel.bind<IStateProxy>(RequestStateProxy).to(RequestStateProxy).inSingletonScope();
  kernel.bind<IRequestCookieProxy>(RequestCookieProxy).to(RequestCookieProxy).inSingletonScope();
  kernel.bind<IJSXBuilder>(ServerBuilder).to(ServerBuilder).inSingletonScope();

  // constructor
  kernel.bind<INewable<Html>>('HtmlComponent').toConstructor(Html);
}
