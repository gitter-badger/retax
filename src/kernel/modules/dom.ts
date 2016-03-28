import { IKernel } from 'inversify';

import {
  IDomBootstrapper, DomBootstrapper,
  IStateProxy, DomStateProxy,
  IDomCookieProxy, DomCookieProxy,
  IJSXBuilder, ClientBuilder,
} from '../../retax';

export default function dom(kernel: IKernel): void {
  kernel.bind<IDomBootstrapper>('DomBootstrapper').to(DomBootstrapper);
  kernel.bind<IStateProxy>('DomStateProxy').to(DomStateProxy);
  kernel.bind<IDomCookieProxy>('DomCookieProxy').to(DomCookieProxy);
  kernel.bind<IJSXBuilder>('ClientJSXBuilder').to(ClientBuilder);
}
