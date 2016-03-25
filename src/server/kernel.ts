import { Kernel } from 'inversify';

import { IBootstrapper, MiddlewareBootstrapper } from '../bootstrap';
import { MiddlewareOptionReader, IOptionReader, IMiddlewareOptions } from '../optionsReaders';
import { StaticMiddlewareFactory, RenderingMiddlewareFactory, IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middleware';

const kernel = new Kernel();

// construtor
kernel.bind<IBootstrapper<IMiddlewareOptions, void, IRetaxMiddleware>>('MiddlewareBootstrapper')
  .to(MiddlewareBootstrapper).inSingletonScope();
kernel.bind<IOptionReader<IMiddlewareOptions>>('MiddlewareOptionReader').to(MiddlewareOptionReader).inSingletonScope();
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(StaticMiddlewareFactory).inSingletonScope();
kernel.bind<IRetaxMiddlewareFactory>('RetaxMiddlewareFactory').to(RenderingMiddlewareFactory).inSingletonScope();

export default kernel;
