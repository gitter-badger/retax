import { IKernel } from 'inversify';

import { IDomBootstrapper, DomBootstrapper } from '../bootstrap';
import { IStateProxy, DomStateProxy } from '../stateProxies';
import { IDomCookieProxy, DomCookieProxy } from '../cookieProxies';
import { IJSXBuilder, ClientBuilder } from '../JSXBuilders';

export default function domModule(kernel: IKernel): void {
  kernel.bind<IDomBootstrapper>('DomBootstrapper').to(DomBootstrapper).inSingletonScope();
  kernel.bind<IStateProxy>('DomStateProxy').to(DomStateProxy).inSingletonScope();
  kernel.bind<IDomCookieProxy>('DomCookieProxy').to(DomCookieProxy).inSingletonScope();
  kernel.bind<IJSXBuilder>('ClientJSXBuilder').to(ClientBuilder).inSingletonScope();
}
