import { IKernel } from 'inversify';

import {
  IMiddlewareBoostrapper, MiddlewareBootstrapper,
  IMiddlewareConfigProxy, MiddlewareConfigProxy,
  IRetaxMiddlewareFactory, StaticMiddlewareFactory, RenderingMiddlewareFactory,
} from '../../middleware';
import { IMiddlewareConfig, middlewareConfig } from '../../config';
import { IConfigStore, createConfigStore } from '../../utils';

export default function middleware(kernel: IKernel): void {
  kernel.bind<IMiddlewareBoostrapper>('MiddlewareBootstrapper').to(MiddlewareBootstrapper);
  kernel.bind<IMiddlewareConfigProxy>('MiddlewareConfigProxy').to(MiddlewareConfigProxy);
  kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(StaticMiddlewareFactory);
  kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(RenderingMiddlewareFactory);

  kernel.bind<IConfigStore<IMiddlewareConfig>>('MiddlewareConfigStore').toValue(createConfigStore(middlewareConfig));
  kernel.bind<IKernel>('Kernel').toValue(kernel); // dincpetion :)
}
