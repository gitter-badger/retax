import { Kernel, IKernel, INewable } from 'inversify';

import {
  MiddlewareBootstrapper,IMiddlewareBoostrapper,
  ServerBootstrapper, IServerBootstrapper,
} from '../bootstrap';
import {
  MiddlewareConfigProxy, IMiddlewareConfigProxy,
  RetaxConfigProxy, IRetaxConfigProxy,
} from '../configProxies';
import { StaticMiddlewareFactory, RenderingMiddlewareFactory, IRetaxMiddlewareFactory } from '../middlewares';
import { createConfigStore, IConfigStore }  from '../configStore';
import {
  internalConfig, IInternalConfig,
  retaxConfig, IRetaxConfig,
  middlewareConfig, IMiddlewareConfig,
} from '../config';
import { ServerStateProxy, IStateProxy } from '../stateProxies';
import { ServerCookieProxy, IServerCookieProxy } from '../cookieProxies';
import { ReduxFacade, IReduxFacade } from '../redux';
import { ReactRouterFacade, IReactRouterFacade } from '../reactRouter';
import { ServerBuilder, IJSXBuilder } from '../JSXBuilders';
import { Html } from '../components';

const kernel = new Kernel();

// middleware
kernel.bind<IMiddlewareBoostrapper>('MiddlewareBootstrapper').to(MiddlewareBootstrapper);
kernel.bind<IMiddlewareConfigProxy>('MiddlewareConfigProxy').to(MiddlewareConfigProxy);
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(StaticMiddlewareFactory);
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(RenderingMiddlewareFactory);

// retax server
kernel.bind<IServerBootstrapper>('ServerBootstrapper').to(ServerBootstrapper);
kernel.bind<IRetaxConfigProxy>('RetaxConfigProxy').to(RetaxConfigProxy);
kernel.bind<IStateProxy>('StateProxy').to(ServerStateProxy);
kernel.bind<IServerCookieProxy>('CookieProxy').to(ServerCookieProxy);
kernel.bind<IReduxFacade>('ReduxFacade').to(ReduxFacade);
kernel.bind<IReactRouterFacade>('ReactRouterFacade').to(ReactRouterFacade);
kernel.bind<IJSXBuilder>('JSXBuilder').to(ServerBuilder);

// constructor
kernel.bind<INewable<Html>>('Html').toConstructor(Html);

// value
kernel.bind<IConfigStore<IInternalConfig>>('InternalConfigStore').toValue(createConfigStore(internalConfig));
kernel.bind<IConfigStore<IRetaxConfig>>('RetaxConfigStore').toValue(createConfigStore(retaxConfig));
kernel.bind<IConfigStore<IMiddlewareConfig>>('MiddlewareConfigStore').toValue(createConfigStore(middlewareConfig));
kernel.bind<IKernel>('Kernel').toValue(kernel); // dincpetion :)

export default kernel;
