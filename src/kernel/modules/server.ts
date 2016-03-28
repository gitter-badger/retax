import { IKernel, INewable } from 'inversify';

import {
  IServerBootstrapper, ServerBootstrapper,
  IStateProxy, ServerStateProxy,
  IServerCookieProxy, ServerCookieProxy,
  IJSXBuilder, ServerBuilder,
  Html,
} from '../../retax';

export default function server(kernel: IKernel): void {
  kernel.bind<IServerBootstrapper>('ServerBootstrapper').to(ServerBootstrapper);
  kernel.bind<IStateProxy>('ServerStateProxy').to(ServerStateProxy);
  kernel.bind<IServerCookieProxy>('ServerCookieProxy').to(ServerCookieProxy);
  kernel.bind<IJSXBuilder>('ServerJSXBuilder').to(ServerBuilder);

  // constructor
  kernel.bind<INewable<Html>>('Html').toConstructor(Html);
}
