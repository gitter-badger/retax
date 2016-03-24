import { Kernel } from 'inversify';

import { IBootstrapper, MiddlewareBootstrapper, IMiddleware } from '../shared/bootstrap';
import { MiddlewareOptionReader, IOptionReader, IMiddlewareOptions } from '../shared/optionsReaders';

const kernel = new Kernel();

// construtor
kernel.bind<IBootstrapper<IMiddlewareOptions, void, IMiddleware>>('MiddlewareBootstrapper').to(MiddlewareBootstrapper).inSingletonScope();
kernel.bind<IOptionReader<IMiddlewareOptions>>('MiddlewareOptionReader').to(MiddlewareOptionReader).inSingletonScope();

export default kernel;
