import { Kernel, IKernel } from 'inversify';

import { MiddlewareBootstrapper, IMiddlewareBoostrapper, ServerBootstrapper , IServerBootstrapper } from '../bootstrap';
import { MiddlewareConfigProxy, IMiddlewareConfigProxy, RetaxConfigProxy, IRetaxConfigProxy } from '../configProxies';
import { StaticMiddlewareFactory, RenderingMiddlewareFactory, IRetaxMiddlewareFactory } from '../middleware';
import { createConfigStore, IConfigStore }  from '../configStore';
import {
  internalConfig, IInternalConfig,
  retaxConfig, IRetaxConfig,
  middlewareConfig, IMiddlewareConfig,
} from '../config';

const kernel = new Kernel();

// middleware
kernel.bind<IMiddlewareBoostrapper>('MiddlewareBootstrapper').to(MiddlewareBootstrapper);
kernel.bind<IMiddlewareConfigProxy>('MiddlewareConfigProxy').to(MiddlewareConfigProxy);
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(StaticMiddlewareFactory);
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(RenderingMiddlewareFactory);

// retax server
kernel.bind<IServerBootstrapper>('ServerBootstrapper').to(ServerBootstrapper);
kernel.bind<IRetaxConfigProxy>('RetaxConfigProxy').to(RetaxConfigProxy);

// value
kernel.bind<IConfigStore<IInternalConfig>>('InternalConfigStore').toValue(createConfigStore(internalConfig));
kernel.bind<IConfigStore<IRetaxConfig>>('RetaxConfigStore').toValue(createConfigStore(retaxConfig));
kernel.bind<IConfigStore<IMiddlewareConfig>>('MiddlewareConfigStore').toValue(createConfigStore(middlewareConfig));
kernel.bind<IKernel>('Kernel').toValue(kernel); // dincpetion :)

export default kernel;
