import { Kernel, IKernel } from 'inversify';

import { MiddlewareBootstrapper, IMiddlewareBoostrapper, ServerBootstrapper , IServerBootstrapper } from '../bootstrap';
import { MiddlewareOptionReader, IMiddlewareOptionReader, RetaxOptionReader, IRetaxOptionReader } from '../optionsReaders';
import { StaticMiddlewareFactory, RenderingMiddlewareFactory, IRetaxMiddlewareFactory } from '../middleware';
import { internalConfig, IInternalConfig }  from '../internalConfig';

const kernel = new Kernel();

// middleware
// constructor
kernel.bind<IMiddlewareBoostrapper>('MiddlewareBootstrapper').to(MiddlewareBootstrapper).inSingletonScope();
kernel.bind<IMiddlewareOptionReader>('MiddlewareOptionReader').to(MiddlewareOptionReader).inSingletonScope();
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(StaticMiddlewareFactory).inSingletonScope();
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(RenderingMiddlewareFactory).inSingletonScope();

// retax server
kernel.bind<IServerBootstrapper>('ServerBootstrapper').to(ServerBootstrapper);
kernel.bind<IRetaxOptionReader>('RetaxOptionReader').to(RetaxOptionReader).inSingletonScope();

// value
kernel.bind<IInternalConfig>('InternalConfig').toValue(internalConfig);
kernel.bind<IKernel>('Kernel').toValue(kernel); // this thing is crazy. DI is awesome. DIncpetion :)

export default kernel;
