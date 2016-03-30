import { IKernel, INewable } from 'inversify';

import { IRequestBootstrapper, RequestBootstrapper } from '../bootstrap';
import { IStateProxy, ServerStateProxy } from '../stateProxies';
import { IServerCookieProxy, ServerCookieProxy } from '../cookieProxies';
import { IJSXBuilder, ServerBuilder } from '../JSXBuilders';
import { Html } from '../components';

export default function serverModule(kernel: IKernel): void {
  kernel.bind<IRequestBootstrapper>('RequestBootstrapper').to(RequestBootstrapper).inSingletonScope();
  kernel.bind<IStateProxy>('ServerStateProxy').to(ServerStateProxy).inSingletonScope();
  kernel.bind<IServerCookieProxy>('ServerCookieProxy').to(ServerCookieProxy).inSingletonScope();
  kernel.bind<IJSXBuilder>('ServerJSXBuilder').to(ServerBuilder).inSingletonScope();

  // constructor
  kernel.bind<INewable<Html>>('Html').toConstructor(Html).inSingletonScope();
}
